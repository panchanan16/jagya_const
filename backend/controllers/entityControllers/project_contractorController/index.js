const ProjectContractorModel = require('@/models/entityModels/project_contractorModel');

const ProjectContractorController = {
   async findAll(req, res) {
      try {
         const data = await ProjectContractorModel.findAll();
         res.status(200).send({ status: true, msg: 'All project contractors retrieved', data });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error retrieving project contractors', data: null });
      }
   },

   async findOne(req, res) {
      try {
         const data = await ProjectContractorModel.findOne(req.body.pro_con_id);
         res.status(200).send({ status: true, msg: 'Project contractor retrieved', data });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error retrieving project contractor', data: null });
      }
   },

   async create(req, res) {
      try {
         const insertId = await ProjectContractorModel.create(req.body);
         res.status(201).send({ status: true, msg: 'Project contractor created', data: { pro_con_id: insertId, ...req.body } });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error creating project contractor', data: null });
      }
   },

   async update(req, res) {
      try {
         const success = await ProjectContractorModel.update(req.body.pro_con_id, req.body);
         res.status(200).send({ status: success, msg: success ? 'Updated successfully' : 'Not found', data: null });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error updating project contractor', data: null });
      }
   },

   async remove(req, res) {
      try {
         const success = await ProjectContractorModel.delete(req.body.pro_con_id);
         res.status(200).send({ status: success, msg: success ? 'Deleted successfully' : 'Not found', data: {pro_con_id: req.body.pro_con_id} });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error deleting project contractor', data: null });
      }
   },
};

module.exports = ProjectContractorController;
