const pool = require('@/config/dbConfig');

class MaterialItemUpdateModel {
   static async readAll() {
      const query =
         'SELECT material_requests.*,p.pro_name,p.pro_ref_no,cl.client_name FROM `material_requests` JOIN projects p ON material_requests.mr_project_id=p.pro_id LEFT JOIN clients cl ON cl.client_id =p.pro_client_r_id ORDER BY mr_r_id DESC ';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query);
         return result;
      } catch (error) {
         console.error('Error retriving Material request:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async updateMdApproval(mr_item_id) {
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query('SELECT md_approval FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);
         if (rows.length === 0) {
            return 0;
         }
         const currentApprovalStatus = rows[0].md_approval;
         const newApprovalStatus = currentApprovalStatus === 0 ? 1 : 0;
         const query = 'UPDATE material_item_list SET md_approval = ? WHERE mr_item_id = ?';
         const [result] = await connPool.query(query, [newApprovalStatus, mr_item_id]);
         return result.affectedRows;
      } catch (error) {
         console.error('Error updating md_approval:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async updateFdApproval(mr_item_id) {
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query('SELECT fd_approval FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);
         if (rows.length === 0) {
            return 0;
         }
         const currentApprovalStatus = rows[0].fd_approval;
         const newApprovalStatus = currentApprovalStatus === 0 ? 1 : 0;
         const query = 'UPDATE material_item_list SET fd_approval = ? WHERE mr_item_id = ?';
         const [result] = await connPool.query(query, [newApprovalStatus, mr_item_id]);
         return result.affectedRows;
      } catch (error) {
         console.error('Error updating fd_approval:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async updateMrDeliveryStatus(mr_item_id) {
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query('SELECT mr_delivery_status FROM material_item_list WHERE mr_item_id = ?', [
            mr_item_id,
         ]);

         if (rows.length === 0) {
            return 0;
         }
         const currentDeliveryStatus = rows[0].mr_delivery_status;
         const newDeliveryStatus = currentDeliveryStatus === 0 ? 1 : 0;
         const query = 'UPDATE material_item_list SET mr_delivery_status = ? WHERE mr_item_id = ?';
         const [result] = await connPool.query(query, [newDeliveryStatus, mr_item_id]);
         return result.affectedRows;
      } catch (error) {
         console.error('Error updating mr_delivery_status:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
   static async getLastMaterialRef() {
      const query = 'SELECT material_ref_no FROM material_requests ORDER BY mr_r_id DESC LIMIT 1;';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving all clients:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
   static async insertMaterialRequestWithItems(materialRequestData, materialItemsData) {
      const conn = await pool.getConnection();
      try {
         await conn.beginTransaction();
         const requestQuery = `
            INSERT INTO material_requests (material_ref_no,  mr_project_id, mr_phase, mr_date) 
            VALUES (?, ?, ?, ?)
         `;
         const [requestResult] = await conn.query(requestQuery, [
            materialRequestData.material_ref_no,
            materialRequestData.mr_project_id,
            materialRequestData.mr_phase,
            materialRequestData.mr_date,
         ]);

         const mr_r_id = requestResult.insertId;
         const itemsQuery = `
            INSERT INTO material_item_list ( 
              mr_r_id, mr_project_r_id, mr_item_name, mr_item_quantity, mr_item_amount, mr_item_date, 
                vendor_id
            ) VALUES ?
         `;

         const itemValues = materialItemsData.map((item) => [
            mr_r_id,
            materialRequestData.mr_project_id,
            item.mr_item_name,
            item.mr_item_quantity,
            item.mr_item_amount,
            item.mr_item_date,
            item.vendor_id,
         ]);

         await conn.query(itemsQuery, [itemValues]);

         await conn.commit();
         return { success: true, insertedId: mr_r_id, ref: materialRequestData.material_ref_no };
      } catch (error) {
         await conn.rollback();
         console.error('Transaction error:', error);
         throw error;
      } finally {
         conn.release();
      }
   }

   static async findAll_materialItems_ByMatrialReqId(mr_r_id) {
      const query ='SELECT p.pro_name,p.pro_ref_no,p.pro_client_r_id ,c.client_name FROM `material_requests` JOIN projects p ON p.pro_id = material_requests.mr_project_id JOIN clients c ON c.client_id =p.pro_client_r_id WHERE material_requests.mr_r_id=?;SELECT ml.*,v.vendor_name FROM material_item_list ml LEFT JOIN vendors v ON v.vendor_id=ml.vendor_id WHERE mr_r_id=?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [mr_r_id, mr_r_id]);
         return rows;
      } catch (error) {
         console.error('Error retrieving all material items:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
   static async replaceMaterialItemsByRequestId(mr_r_id, mr_project_id, materialItemsData) {
      const connPool = await pool.getConnection();

      try {
         await connPool.beginTransaction();
         const deleteQuery = 'DELETE FROM material_item_list WHERE mr_r_id = ?';
         await connPool.query(deleteQuery, [mr_r_id]);

         const insertQuery = `
          INSERT INTO material_item_list (
            mr_project_r_id,
            mr_item_name,
            mr_item_quantity,
            mr_item_amount,
            mr_item_date,
            mr_r_id,
            vendor_id,
            fd_approval,
            md_approval,
            mr_delivery_status
          ) VALUES ?
        `;
         const insertValues = materialItemsData.map((item) => [
            mr_project_id,
            item.mr_item_name,
            item.mr_item_quantity,
            item.mr_item_amount,
            item.mr_item_date,
            mr_r_id,
            item.vendor_id,
            item.fd_approval,
            item.md_approval,
            item.mr_delivery_status,
         ]);
         if (insertValues.length > 0) {
            await connPool.query(insertQuery, [insertValues]);
         }
         await connPool.commit();
         return { success: true };
      } catch (error) {
         await connPool.rollback();
         console.error('Error replacing material items:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = MaterialItemUpdateModel;
