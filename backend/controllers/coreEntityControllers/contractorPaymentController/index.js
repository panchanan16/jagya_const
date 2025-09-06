//Hello, this is a Controller for contractor!
const ContractorsPaymentModel = require('@/models/coreEntityModels/contractorPaymentModel');

class ContractorsCorePaymentController {
   // Get all contractors payments
   static async findAllByID(req, res) {
      const { pay_con_id } = req.query;
      try {
         const data = await ContractorsPaymentModel.findAll_ByID(pay_con_id);
         let details={
            contractor:data[0][0],
            payments:data[1],
            projects:data[2],
         }
         return res.status(200).send({ status: true, msg: 'Contractors retrieved successfully', details });
      } catch (error) {
         console.error('Error fetching contractors:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error' });
      }
   }
}

module.exports = ContractorsCorePaymentController;
