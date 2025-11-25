const coreMaterialRequestRemainingModel = require('@/models/coreEntityModels/material_reqModel/remainings');
const pool = require('@/config/dbConfig');

class MaterialRemainingController {
   static async createRemainingForMaterial(req, res) {
      const { pro_id } = req.params;
      const { mr_r_id, item_id, total_amount, amount_paid, date } = req.body;
      try {
         const affectedRows = await coreMaterialRequestRemainingModel.createRemainingForMaterial(req.body);
         if (!affectedRows) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         const reArrange_data = {};
         affectedRows.rm_id.forEach((item) => {
            const key = `${item.rm_id}-${item.payment_mode}-${item.total_amount}`;
            if (!reArrange_data[key]) {
               reArrange_data[key] = {
                  rm_id: item.rm_id,
                  mr_r_id: item.mr_r_id,
                  project_id: item.project_id,
                  payment_mode: item.payment_mode,
                  remaining: item.remaining,
                  total_amount: item.total_amount,
                  rm_status: item.rm_status,
                  rm_date: item.rm_date,
                  items: [],
               };
            }
            reArrange_data[key].items.push({
               mr_pri_id: item.mr_pri_id,
               item_id: item.item_id,
               item_name: item.mr_item_name,
               item_amount: item.item_amount,
               item_mr_id: item.item_mr_id,
               payment_status: item.payment_status,
            });
         });
         return res.status(200).send({
            status: true,
            msg: 'Remaining created successfully!',
            data: Object.values(reArrange_data),
         });
      } catch (error) {
         console.error('Error updating createRemainingForMaterial:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   static async getRemainingByProject(req, res) {
      const { pro_id } = req.params;
      try {
         const results = await coreMaterialRequestRemainingModel.getRemainingByProject(pro_id);
         if (results === 0) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         const reArrange_data = {};
         results.forEach((item) => {
            const key = `${item.rm_id}-${item.payment_mode}-${item.total_amount}`;
            if (!reArrange_data[key]) {
               reArrange_data[key] = {
                  rm_id: item.rm_id,
                  mr_r_id: item.mr_r_id,
                  project_id: item.project_id,
                  payment_mode: item.payment_mode,
                  remaining: item.remaining,
                  total_amount: item.total_amount,
                  rm_status: item.rm_status,
                  rm_date: item.rm_date,
                  items: [],
               };
            }
            reArrange_data[key].items.push({
               mr_pri_id: item.mr_pri_id,
               item_id: item.item_id,
               item_name: item.mr_item_name,
               item_amount: item.item_amount,
               item_mr_id: item.item_mr_id,
               payment_status: item.payment_status,
               vendor_name: item.vendor_name,
               material_ref_no: item.material_ref_no,
            });
         });
         return res.status(200).send({ status: true, msg: 'Remaining retrived!', data: Object.values(reArrange_data) });
      } catch (error) {
         console.error('Error updating getRemainingByProject:', error);
         return res.status(500).send({ status: false, msg: 'Getting Error in read RemainingByProject', data: null });
      }
   }
   static async updateRemainingPaymentsStatus(req, res) {
      const { rm_id } = req.params;
      const { rm_status } = req.body;
      try {
         const affectedRows = await coreMaterialRequestRemainingModel.updateRemainingPaymentsStatus(rm_id, rm_status);
         if (!affectedRows) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         return res.status(200).send({
            status: true,
            msg: 'Remaining Status successfully!',
            data: { rm_id },
         });
      } catch (error) {
         console.error('Error updating createRemainingForMaterial:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   static async removeRemainingForMaterial(req, res) {
      const { rm_id } = req.params;
      try {
         const affectedRows = await coreMaterialRequestRemainingModel.removeRemainingForMaterial(rm_id);
         if (!affectedRows) {
            return res.status(404).send({ status: false, msg: 'No records found to delete.', data: null });
         }
         return res.status(200).send({
            status: true,
            msg: 'Remaining removed successfully!',
            data: { rm_id },
         });
      } catch (error) {
         console.error('Error updating removeRemainingForMaterial:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   //    static async addRemainingItems(req, res) {
   //    const { pro_id } = req.params;
   //    const { mr_r_id, item_id, total_amount, amount_paid, date } = req.body;
   //    try {
   //       const affectedRows = await coreMaterialRequestRemainingModel.addRemainingItems(req.body);
   //       if (!affectedRows) {
   //          return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
   //       }
   //       return res.status(200).send({
   //          status: true,
   //          msg: 'Remaining created successfully!',
   //          data: null,
   //       });
   //    } catch (error) {
   //       console.error('Error updating addRemainingItems:', error);
   //       return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
   //    }
   // }
}

module.exports = MaterialRemainingController;
