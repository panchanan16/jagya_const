const MaterialItemUpdateModel = require('@/models/entityModels/material_itemModel');
const coreMaterialRequestModel = require('@/models/coreEntityModels/material_reqModel/payment_other.js');
// const MaterialItemUpdateModel = require('@/models/entityModels/material_itemModel');
const pool = require('@/config/dbConfig');

class MaterialPaymentsController {
   static async updateMrPaymentStatus(req, res) {
      const connPool = await pool.getConnection();

      const { mr_item_id } = req.params;
      const { payment_status,payment_mode, payment_date } = req.body;
      try {
         const affectedRows = await coreMaterialRequestModel.updateMrPaymentStatus(
            mr_item_id,
            payment_status,
            payment_date,
            payment_mode
         );
         if (affectedRows === 0) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         return res.status(200).send({
            status: true,
            msg: 'Payment Made, also expense & vendor_payment updated',
            data: null,
         });
      } catch (error) {
         console.error('Error updating mr_payment_status:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   static async updateMrPaymentStatusPartial(req, res) {
      const connPool = await pool.getConnection();

      const { mr_item_id } = req.params;
      const { payment_status, payment_date } = req.body;
      try {
         const affectedRows = await coreMaterialRequestModel.updateMrPaymentStatus(
            mr_item_id,
            payment_status,
            payment_date
         );
         if (affectedRows === 0) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         const [rows] = await connPool.query('SELECT mr_payment_status FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);
         const updatedStatus = rows[0].mr_payment_status;
         const message = updatedStatus === 1 ? 'mr_payment_status approved' : 'mr_payment_status not approved';

         return res.status(200).send({
            status: true,
            msg: message,
            data: { updatedStatus },
         });
      } catch (error) {
         console.error('Error updating mr_payment_status:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
}

module.exports = MaterialPaymentsController;
