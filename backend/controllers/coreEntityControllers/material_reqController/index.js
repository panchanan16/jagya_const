const MaterialItemUpdateModel = require('@/models/entityModels/material_itemModel');
const coreMaterialRequestModel = require('@/models/coreEntityModels/material_reqModel');
// const MaterialItemUpdateModel = require('@/models/entityModels/material_itemModel');
const pool = require('@/config/dbConfig');

class MaterialItemUpdateController {
   static async readAll(req, res) {
      try {
         const affectedRows = await coreMaterialRequestModel.readAll();
         if (affectedRows === 0) {
            return res.status(404).send({ status: false, msg: 'No records found', data: null });
         }
         return res
            .status(200)
            .send({ status: true, msg: 'Material request retrived successfully', data: affectedRows });
      } catch (error) {
         console.error('Error retriving  Material request:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async insertMaterialRequestWithItems(req, res) {
      const { mr_project_id, mr_phase, mr_date, materialItemsData } = req.body;
      if (!mr_project_id || !Array.isArray(materialItemsData) || materialItemsData.length === 0) {
         return res.status(400).send({ status: false, msg: 'Invalid request data', data: null });
      }
      try {
         const [data] = await coreMaterialRequestModel.getLastMaterialRef();
         let newMaterialRef;
         if (data['material_ref_no']) {
            let lastNum = parseInt(data['material_ref_no'].slice(-4));
            newMaterialRef = data['material_ref_no'].replace(lastNum, lastNum + 1);
         } else {
            newMaterialRef = 'JGCMRQ0001';
         }
         const result = await coreMaterialRequestModel.insertMaterialRequestWithItems(
            { mr_project_id, mr_phase, mr_date, ...{ material_ref_no: newMaterialRef } },
            materialItemsData
         );
         return res.status(200).send({
            status: true,
            msg: 'Material request and items inserted successfully',
            data: {
               mr_r_id: result.insertedId,
               material_ref_no: result.ref,
               mr_project_id,
               mr_phase,
               mr_date,
            },
         });
      } catch (error) {
         console.error('Error inserting material request and itams:', error);
         return res.status(500).send({
            status: false,
            msg: 'Error inserting material request and itams',
            data: null,
         });
      }
   }
   static async updateMdApproval(req, res) {
      const { mr_item_id } = req.params;
      const connPool = await pool.getConnection();
      try {
         const affectedRows = await coreMaterialRequestModel.updateMdApproval(mr_item_id);
         if (affectedRows === 0) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         const [rows] = await connPool.query('SELECT md_approval FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);
         const updatedStatus = rows[0].md_approval;
         const message = updatedStatus === 1 ? 'md_approval approved' : 'md_approval not approved';

         return res.status(200).send({ status: true, msg: message, data: { updatedStatus } });
      } catch (error) {
         console.error('Error updating md_approval:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async updateFdApproval(req, res) {
      const connPool = await pool.getConnection();

      const { mr_item_id } = req.params;
      try {
         const affectedRows = await coreMaterialRequestModel.updateFdApproval(mr_item_id);
         if (affectedRows === 0) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         const [rows] = await connPool.query('SELECT fd_approval FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);
         const updatedStatus = rows[0].fd_approval;
         const message = updatedStatus === 1 ? 'fd_approval approved' : 'fd_approval not approved';

         return res.status(200).send({ status: true, msg: message, data: { updatedStatus } });
      } catch (error) {
         console.error('Error updating fd_approval:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async updateMrDeliveryStatus(req, res) {
      const connPool = await pool.getConnection();

      const { mr_item_id } = req.params;
      try {
         const affectedRows = await coreMaterialRequestModel.updateMrDeliveryStatus(mr_item_id);
         if (affectedRows === 0) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         const [rows] = await connPool.query('SELECT mr_delivery_status FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);
         const updatedStatus = rows[0].mr_delivery_status;
         const message = updatedStatus === 1 ? 'mr_delivery_status approved' : 'mr_delivery_status not approved';

         return res.status(200).send({
            status: true,
            msg: message,
            data: { updatedStatus },
         });
      } catch (error) {
         console.error('Error updating mr_delivery_status:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   static async updateMrPaymentStatus(req, res) {
      const connPool = await pool.getConnection();

      const { mr_item_id } = req.params;
      const { payment_status, payment_date } = req.body;
      try {
         const affectedRows = await coreMaterialRequestModel.updateMrPaymentStatus(mr_item_id,payment_status, payment_date);
         if (affectedRows === 0) {
            return res.status(404).send({ status: false, msg: 'No records found to update.', data: null });
         }
         const [rows] = await connPool.query('SELECT mr_delivery_status FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);
         const updatedStatus = rows[0].mr_delivery_status;
         const message = updatedStatus === 1 ? 'mr_delivery_status approved' : 'mr_delivery_status not approved';

         return res.status(200).send({
            status: true,
            msg: message,
            data: { updatedStatus },
         });
      } catch (error) {
         console.error('Error updating mr_delivery_status:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async findAllByMatrialReqId(req, res) {
      const { id } = req.params;
      try {
         const requests = await coreMaterialRequestModel.findAll_materialItems_ByMatrialReqId(id);
         return res.status(200).send({
            status: true,
            msg: 'Material requests retrieved successfully',
            data: { ...requests[0][0], materialItemsData: requests[1] },
         });
      } catch (error) {
         console.error('Error fetching material requests:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   static async updateMaterialItemList(req, res) {
      const { mr_r_id, mr_project_id, materialItemsData } = req.body;

      if (!mr_r_id || !Array.isArray(materialItemsData)) {
         return res.status(400).send({
            status: false,
            msg: 'Invalid request: mr_r_id and materialItemsData are required',
            data: null,
         });
      }

      try {
         const result = await coreMaterialRequestModel.replaceMaterialItemsByRequestId(
            mr_r_id,
            mr_project_id,
            materialItemsData
         );

         return res.status(200).send({
            status: true,
            msg: 'Material items updated successfully',
            data: result,
         });
      } catch (error) {
         console.error('Error updating material items:', error);
         return res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }
}

module.exports = MaterialItemUpdateController;
