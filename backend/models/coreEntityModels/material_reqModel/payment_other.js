const pool = require('@/config/dbConfig');

class MaterialPaymentsModel {
   static async updateMrPaymentStatus(mr_item_id, payment_status, payment_date, payment_mode) {
      const conn = await pool.getConnection();
      try {
         await conn.beginTransaction();
         const [itemRows] = await conn.query(
            'SELECT mr_item_id, mr_r_id, mr_item_amount, mr_item_amount, mr_project_r_id, vendor_id, mr_item_name FROM material_item_list WHERE mr_item_id = ?',
            [mr_item_id]
         );
         if (itemRows.length === 0) throw new Error('Item not found');
         const item = itemRows[0];
         await conn.query('UPDATE material_item_list SET payment_status=?, payment_date=? WHERE mr_item_id=?', [
            payment_status,
            payment_date,
            mr_item_id,
         ]);
         let expenseId,
            vendorPay_id = null;
         if (payment_status === 'completed') {
            const expenseQuery = `INSERT INTO expenses (exp_name, exp_amount, exp_mode, exp_remark, exp_date, exp_category, exp_project_ref) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const [expResult] = await conn.query(expenseQuery, [
               `${item.mr_item_name} purchase`,
               item.mr_item_amount || 0,
               payment_mode || 'UPI',
               'MR payment For mr_r_id' + mr_r_id,
               payment_date,
               'Materials',
               item.mr_project_r_id,
            ]);
            expenseId = expResult.insertId;

            const vendorPayQuery = `INSERT INTO vendor_payments (pay_vendor_id, pay_project_id, pay_amount, pay_mode, pay_note, pay_exp_id) VALUES (?, ?, ?, ?, ?, ?)`;
            await conn.query(vendorPayQuery, [
               item.vendor_id,
               item.mr_project_r_id,
               item.mr_item_amount || 0,
               payment_mode || 'UPI',
               'Auto created from MR payment',
               expenseId,
            ]);
            vendorPay_id = vendorPayQuery.insertId;
         }
         await conn.commit();
         return { success: true };
      } catch (err) {
         await conn.rollback();
         console.error('Error updating MR payment:', err);
         throw err;
      } finally {
         conn.release();
      }
   }

   // static async updateMrPaymentStatusPartial(mr_item_id, payment_status, payment_date) {
   //    const connPool = await pool.getConnection();
   //    try {
   //       const query = 'UPDATE material_item_list SET payment_status=? , payment_date=? WHERE mr_item_id=?';
   //       const [result] = await connPool.query(query, [newDeliveryStatus, mr_item_id, payment_status, payment_date]);
   //       return result.affectedRows;
   //    } catch (error) {
   //       console.error('Error updating mr_delivery_status:', error);
   //       throw error;
   //    } finally {
   //       connPool.release();
   //    }
   // }
}

module.exports = MaterialPaymentsModel;
