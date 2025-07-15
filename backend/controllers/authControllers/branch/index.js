const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ROLES_LIST = require('@/config/roles_list.js');
const branchModel = require('@/models/authModels/branch/index.js');
exports.create = async (req, res) => {
   const schema = Joi.object({
      id: Joi.required(),
      user_id: Joi.string().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      cpassword: Joi.string().valid(Joi.ref('password')).required().messages({
         'any.only': 'Confirm Password must match Password!',
         'any.required': 'Confirm Password is required!',
      }),
   });

   try {
      const { id, user_id, password, cpassword } = req.body;
      console.log(req.body);
      const { error } = schema.validate({ id, user_id, password, cpassword });
      if (error) {
         return res.status(400).json({
            err: error,
            status: false,
            msg: error.message,
         });
      }
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);
      const result = await branchModel.create(id, user_id, hash);
      if (!result) {
         return res.status(500).json({
            status: false,
            msg: 'Something Went Wrong!',
         });
      }
      return res.status(200).json({ status: true, msg: 'Branch Created Successfully! Now you can login ' });
   } catch (err) {
      console.log(err);
      return res.status(500).json({
         status: false,
         errMsg: err.message,
         error: err,
         msg: 'Something Went Wrong!',
      });
   }
};

// Login function
exports.handleLogin = async (req, res) => {
   const schema = Joi.object({
      user_id: Joi.string().required(),
      password: Joi.string().required().messages({
         'any.required': 'Password is required!',
      }),
   });

   try {
      const { user_id, password } = req.body;
      const { error } = schema.validate({ user_id, password });
      if (error) {
         return res.status(400).json({
            err: error,
            status: false,
            msg: error.message,
         });
      }

      const result = await branchModel.findByLoginInfo(user_id);
      if (!result) {
         return res.status(500).json({
            status: false,
            msg: 'Invalid user_id/email or password!',
         });
      }

      const match = await bcrypt.compare(password, result.password);
      if (match) {
         const roles = ROLES_LIST.Branch;
         const accessToken = jwt.sign(
            {
               UserInfo: {
                  user_id: result.id,
                  email: result.email,
                  roles: roles,
               },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15d' }
         );

         const refreshToken = jwt.sign({ email: result.email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '5d',
         });

         await branchModel.updateToken(result.id, refreshToken);
         res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
         });

         return res.status(200).json({ status: true, msg: 'Successfully Logged In!',data :{role:'Branch',accessToken, refreshToken }});
      } else {
         return res.status(401).json({ status: false, msg: 'Invalid email or password!' });
      }
   } catch (err) {
      console.log(err);
      return res.status(500).json({
         status: false,
         errMsg: err.message,
         error: err,
         msg: 'Something Went Wrong!',
      });
   }
};
exports.handleRefreshToken = async (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.status(204).json({ status: true, msg: 'Refresh Failed! No Content' });
   const refreshToken = cookies.jwt;
   const foundUser = await branchModel.getUserByToken(refreshToken);
   if (!foundUser) return res.status(403).json({ status: true, msg: 'User Not Found !' });
   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.email !== decoded.email)
         return res.status(403).json({ status: true, msg: 'User Not Found !' });
      // const roles = Object.values(foundUser.roles);
      const roles = ROLES_LIST.Branch;
      const accessToken = jwt.sign(
         {
            UserInfo: {
               email: decoded.email,
               roles: roles,
            },
         },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '5d' }
      );
      res.status(200).json({ status: true, msg: 'Successfully Login Refreshed !', accessToken });
   });
};

exports.handleLogout = async (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.status(204).json({ status: true, msg: 'Refresh Failed! No Content' });
   const refreshToken = cookies.jwt;
   const foundUser = await branchModel.getUserByToken(refreshToken);
   if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.status(204).json({ status: true, msg: 'Refresh Failed! No Content' });
   }
   // Delete refreshToken in db
   const DeleteToken = await branchModel.DeleteToken(refreshToken);
   res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
   res.sendStatus(204);
};
