const vendorPayModel = require('@/models/entityModels/vendorPaymentModel');

class vendorPayController {
   static async findAll(req, res) {
      const { pay_vendor_id } = req.body;
      try {
         const result = await vendorPayModel.findAll(pay_vendor_id);
         let vendor_payments ={
            vendor:result[1][0],
            payments:result[0]
         }
         return res.status(200).send({ status: true, msg: 'Payments retrieved successfully', data: vendor_payments });
      } catch (error) {
         console.error('Error fetching payments:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async findOne(req, res) {
      const { pay_id } = req.body;
      try {
         const payment = await vendorPayModel.findOne(pay_id);
         if (!payment) {
            return res.status(404).send({ status: false, msg: 'Payment not found', data: null });
         }
         return res.status(200).send({ status: true, msg: 'Payment retrieved successfully', data: payment });
      } catch (error) {
         console.error(`Error retrieving payment with ID ${pay_id}:`, error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async create(req, res) {
      const { pay_vendor_id, pay_project_id, pay_amount, pay_note } = req.body;
      try {
         const newPayment = await vendorPayModel.create(pay_vendor_id, pay_project_id, pay_amount, pay_note);
         return res.status(201).send({ status: true, msg: 'Payment created successfully', data: newPayment });
      } catch (error) {
         console.error('Error creating payment:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async update(req, res) {
      const { pay_id } = req.body;
      const { pay_vendor_id, pay_project_id, pay_amount, pay_note } = req.body;
      try {
         const isUpdated = await vendorPayModel.update(pay_id, pay_vendor_id, pay_project_id, pay_amount, pay_note);
         if (!isUpdated) {
            return res.status(404).send({ status: false, msg: 'Payment not found', data: null });
         }
         return res.status(200).send({ status: true, msg: 'Payment updated successfully', data: null });
      } catch (error) {
         console.error(`Error updating payment with ID ${pay_id}:`, error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async remove(req, res) {
      const { pay_id } = req.body;
      try {
         const isDeleted = await vendorPayModel.remove(pay_id);
         if (!isDeleted) {
            return res.status(404).send({ status: false, msg: 'Payment not found', data: null });
         }
         return res.status(200).send({ status: true, msg: 'Payment deleted successfully', data: null });
      } catch (error) {
         console.error(`Error deleting payment with ID ${pay_id}:`, error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async paginate(req, res) {
      let { page, limit } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      try {
         const paginatedData = await vendorPayModel.paginate(page, limit);
         return res.status(200).send({ status: true, msg: 'Payments retrieved successfully', data: paginatedData });
      } catch (error) {
         console.error('Error fetching paginated payments:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
}

module.exports = vendorPayController;
