const contractorPayModel = require('@/models/entityModels/contractorPaymentModel');

class contractorPayController {
   // Get all payments (optionally by contractor)
   static async findAll(req, res) {
      const { pay_con_id } = req.query;
      try {
         const payments = await contractorPayModel.findAll(pay_con_id);
         return res.status(200).send({
            status: true,
            msg: 'Payments retrieved successfully',
            data: payments,
         });
      } catch (error) {
         console.error('Error fetching payments:', error);
         return res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }

   // Get single payment
   static async findOne(req, res) {
      const { pay_id } = req.body;
      try {
         const payment = await contractorPayModel.findOne(pay_id);
         if (!payment) {
            return res.status(404).send({
               status: false,
               msg: 'Payment not found',
               data: null,
            });
         }
         return res.status(200).send({
            status: true,
            msg: 'Payment retrieved successfully',
            data: payment,
         });
      } catch (error) {
         console.error(`Error retrieving payment with ID ${pay_id}:`, error);
         return res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }

   // Create payment (Excel-style entry)
   static async create(req, res) {
      const {
         pay_con_id,
         pay_project_id,
         pay_date,

         pay_amount,
         pay_mode,
         pay_note,
         pay_exp_id,

         pay_total_bill,
         pay_tds,
         pay_payable,
         pay_previous,
         pay_grand_total,
         pay_pending,

         pay_labour,
         pay_work_status,
         pay_sqft,
      } = req.body;

      if (!pay_con_id || !pay_project_id || !pay_amount) {
         return res.status(400).send({
            status: false,
            msg: 'Required fields are missing',
            data: null,
         });
      }

      try {
         const newPayment = await contractorPayModel.create(
            pay_con_id,
            pay_project_id,
            pay_date,

            pay_amount,
            pay_mode,
            pay_note,
            pay_exp_id,

            pay_total_bill,
            pay_tds,
            pay_payable,
            pay_previous,
            pay_grand_total,
            pay_pending,

            pay_labour,
            pay_work_status,
            pay_sqft
         );

         return res.status(201).send({
            status: true,
            msg: 'Payment created successfully',
            data: newPayment,
         });
      } catch (error) {
         console.error('Error creating payment:', error);
         return res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }

   // Update payment
   static async update(req, res) {
      const {
         pay_id,
         pay_con_id,
         pay_project_id,
         pay_date,

         pay_amount,
         pay_mode,
         pay_note,
         pay_exp_id,

         pay_total_bill,
         pay_tds,
         pay_payable,
         pay_previous,
         pay_grand_total,
         pay_pending,

         pay_labour,
         pay_work_status,
         pay_sqft,
      } = req.body;

      if (!pay_id) {
         return res.status(400).send({
            status: false,
            msg: 'Payment ID is required',
            data: null,
         });
      }

      try {
         const isUpdated = await contractorPayModel.update(
            pay_id,
            pay_con_id,
            pay_project_id,
            pay_date,

            pay_amount,
            pay_mode,
            pay_note,
            pay_exp_id,

            pay_total_bill,
            pay_tds,
            pay_payable,
            pay_previous,
            pay_grand_total,
            pay_pending,

            pay_labour,
            pay_work_status,
            pay_sqft
         );

         if (!isUpdated) {
            return res.status(404).send({
               status: false,
               msg: 'Payment not found',
               data: null,
            });
         }

         return res.status(200).send({
            status: true,
            msg: 'Payment updated successfully',
            data: null,
         });
      } catch (error) {
         console.error(`Error updating payment with ID ${pay_id}:`, error);
         return res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }

   // Delete payment
   static async remove(req, res) {
      const { pay_id } = req.body;
      try {
         const isDeleted = await contractorPayModel.remove(pay_id);
         if (!isDeleted) {
            return res.status(404).send({
               status: false,
               msg: 'Payment not found',
               data: null,
            });
         }
         return res.status(200).send({
            status: true,
            msg: 'Payment deleted successfully',
            data: null,
         });
      } catch (error) {
         console.error(`Error deleting payment with ID ${pay_id}:`, error);
         return res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }
}

module.exports = contractorPayController;
