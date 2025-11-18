const pool = require('@/config/dbConfig');

class MaterialRemainingModel {
   static async createRemainingForMaterial(data) {
      const connPool = await pool.getConnection();
      await connPool.beginTransaction();

      try {
         // select from material_item_list
         // ---------------------------------------------------
         const sql = `SELECT * FROM material_item_list WHERE mr_item_id IN (${data.items.join(',')} )`;
         console.log(data.items, sql);

         const [AllItemDetails] = await connPool.execute(sql);
         if (AllItemDetails.length === 0) {
            throw new Error('No items found for given item_ids');
         }

         //  Insert in material_payment_remaining
         // ---------------------------------------------------
         const mainSql = `INSERT INTO material_payment_remaining (payment_mode, remaining, total_amount, rm_status, rm_date, project_id) VALUES (?, ?, ?, ?, ?, ?) `;
         const [mainResult] = await connPool.execute(mainSql, [
            data.payment_mode || 'UPI',
            data.remaining,
            data.total_amount,
            data.payment_status || 'remaining',
            data.payment_date,
            data.pro_id,
         ]);
         const rm_id = mainResult.insertId;

         //  Insert in material_payment_remaining_items
         // material req id not yet inserted @
         // ---------------------------------------------------
         if (data.items?.length > 0) {
            const itemSql = `INSERT INTO material_payment_remaining_items (rm_id, item_id, item_mr_id) VALUES ?`;
            const itemValues = AllItemDetails.map((i) => [rm_id, i.mr_item_id, i.mr_r_id]);
            await connPool.query(itemSql, [itemValues]);
         }

         // Insert in expenses
         // --------------------------------------------------
         // const expSql = `INSERT INTO expenses (exp_name, exp_amount, exp_mode, exp_remark, exp_date, exp_category, exp_project_ref) VALUES (?, ?, ?, ?, ?, ?, ?) `;
         // const [expResult] = await connPool.execute(expSql, [
         //    data.expense_name,
         //    data.remaining,
         //    data.payment_mode,
         //    data.note,
         //    data.rm_date,
         //    data.expense_category,
         //    data.project_id,
         // ]);
         // const expId = expResult.insertId;

         //  vendor_payment entry
         // ---------------------------------------------------
         // const vendorSql = `INSERT INTO vendor_payments (pay_vendor_id, pay_project_id, pay_amount, pay_mode, pay_note, pay_exp_id) VALUES (?, ?, ?, ?, ?, ?) `;
         // await connPool.execute(vendorSql, [
         //    data.vendor_id,
         //    data.project_id,
         //    data.remaining,
         //    data.payment_mode,
         //    data.note,
         //    expId,
         // ]);

         await connPool.commit();
         connPool.release();
         return { success: true };
      } catch (err) {
         await connPool.rollback();
         throw err;
      } finally {
         connPool.release();
      }
   }
   static async getRemainingByProject(pro_id) {
      const connPool = await pool.getConnection();
      try {
         const query =
            'SELECT * FROM material_payment_remaining mpr LEFT JOIN material_payment_remaining_items mpri ON mpri.rm_id=mpr.rm_id  LEFT JOIN material_item_list mil ON mil.mr_item_id=mpri.item_id WHERE project_id = ?';
         const [result] = await connPool.query(query, [pro_id]);
         return result;
      } catch (error) {
         console.error('Error retriving RemainingByProject:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
   static async updateRemainingPaymentsStatus(rm_id, rm_status, rm_date) {
      const connPool = await pool.getConnection();
      await connPool.beginTransaction();
      try {
         if (rm_status !== 'completed') {
            const query = 'UPDATE material_payment_remaining SET payment_status = ? , rm_date =? WHERE rm_id = ?;';
            const [result] = await connPool.execute(query, [rm_status]);
            return;
         }
         const update_getSelectedItems =
            'UPDATE material_payment_remaining SET rm_status = ?, rm_date =? WHERE rm_id = ?; SELECT item_id FROM material_payment_remaining_items WHERE rm_id = ?';
         const [result] = await connPool.execute(update_getSelectedItems, [
            rm_status,
            rm_date || new Date(),
            rm_id,
            rm_id,
         ]);
         if (update_getSelectedItems?.length > 0) {
            const updateMaterialItemList =
               'UPDATE material_item_list SET payment_status = ?, payment_date=? WHERE mr_item_id = ?;';
            const itemValues = result[1].map((i) => [rm_status, rm_date || new Date(), rm_id]);
            for (const values of itemValues) {
               await connPool.execute(updateMaterialItemList, values);
            }
         }
         await connPool.commit();
         connPool.release();
         return { success: true };
      } catch (error) {
         await connPool.rollback();
         console.error('Error updateRemainingPaymentsStatus:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // static async addRemainingForMaterial(mr_item_id, payment_status, payment_date) {
   //    const connPool = await pool.getConnection();
   //    await connPool.beginTransaction();
   //    try {
   //       const query = 'UPDATE material_payment_remaining SET payment_status = ? , payment_date	=? WHERE mr_item_id = ?';
   //       const [result] = await connPool.query(query, [newDeliveryStatus, mr_item_id, payment_status, payment_date]);
   //       await connPool.commit();
   //       connPool.release();
   //       return { success: true };
   //    } catch (error) {
   //       await connPool.rollback();
   //       console.error('Error updating mr_delivery_status:', error);
   //       throw error;
   //    } finally {
   //       connPool.release();
   //    }
   // }
}

module.exports = MaterialRemainingModel;
