const pool = require('@/config/dbConfig');

class MaterialPaymentsModel {
   static async updateMrPaymentStatus(mr_item_id, payment_status, payment_date, payment_mode) {
      const connPool = await pool.getConnection();
      try {
         await connPool.beginTransaction();
         const [itemRows] = await connPool.query(
            'SELECT mr_item_id, mr_r_id, mr_item_amount, mr_project_r_id, vendor_id, mr_item_name FROM material_item_list WHERE mr_item_id = ?',
            [mr_item_id]
         );

         if (itemRows[0].mr_item_amount == 0 || itemRows[0].mr_item_amount == null) {
            return { success: false, msg: 'Amount not set By Finance Dept.' };
         }
         if (itemRows.length === 0) throw new Error('Item not found');
         const item = itemRows[0];
         await connPool.query(
            'UPDATE material_item_list SET payment_status=?, payment_date=?,payment_mode=? WHERE mr_item_id=?',
            [payment_status, payment_date, payment_mode || 'UPI', mr_item_id]
         );
         let expenseId, vendorPay_id;
         if (payment_status === 'completed') {
            const expenseQuery = `INSERT INTO expenses (exp_name, exp_amount, exp_mode, exp_remark, exp_date, exp_category, exp_project_ref) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const [expResult] = await connPool.query(expenseQuery, [
               `${item.mr_item_name} purchase`,
               item.mr_item_amount || 0,
               payment_mode || 'UPI',
               'MR payment For mr_r_id' + item.mr_r_id,
               payment_date,
               'Materials',
               item.mr_project_r_id,
            ]);
            expenseId = expResult.insertId;
            await connPool.query(
               `INSERT INTO relations (entity_a, entity_a_id, entity_b, entity_b_id, relation_type) VALUES (?,?,?,?,?)`,
               ['expenses', expenseId, 'material_item_list', mr_item_id, 'mr_payment_relation']
            );
            const vendorPayQuery = `INSERT INTO vendor_payments (pay_vendor_id, pay_project_id, pay_amount, pay_mode, pay_note, pay_exp_id) VALUES (?, ?, ?, ?, ?, ?)`;
            const [vendorPayResult] = await connPool.query(vendorPayQuery, [
               item.vendor_id,
               item.mr_project_r_id,
               item.mr_item_amount || 0,
               payment_mode || 'UPI',
               'Auto created from MR payment',
               expenseId,
            ]);
            vendorPay_id = vendorPayResult.insertId;
            await connPool.query(
               `INSERT INTO relations (entity_a, entity_a_id, entity_b, entity_b_id, relation_type) VALUES (?,?,?,?,?)`,
               ['vendor_payments', vendorPay_id, 'material_item_list', mr_item_id, 'mr_payment_relation']
            );
         } else {
            const sql = `UPDATE material_item_list SET payment_status='pending', payment_date='',payment_mode=''  WHERE mr_item_id =?`;
            const [AllItemDetails] = await connPool.execute(sql, [mr_item_id]);

            const selectRelation = `SELECT * FROM relations WHERE entity_b='material_item_list' AND entity_b_id=${mr_item_id};`;
            const [selectedRelation] = await connPool.execute(selectRelation);
            for (const row of selectedRelation) {
               const { entity_a, entity_a_id } = row;
               console.log(entity_a, entity_a_id);

               if (entity_a === 'expenses') {
                  await connPool.query(`DELETE FROM expenses WHERE exp_id = ?`, [entity_a_id]);
               }
               if (entity_a === 'vendor_payments') {
                  await connPool.query(`DELETE FROM vendor_payments WHERE pay_id = ?`, [entity_a_id]);
               }
               await connPool.query(`DELETE FROM relations WHERE rel_id = ?`, [row.rel_id]);
            }
         }
         await connPool.commit();
         return { success: true };
      } catch (err) {
         await connPool.rollback();
         console.error('Error updating MR payment:', err);
         throw err;
      } finally {
         connPool.release();
      }
   }

}

module.exports = MaterialPaymentsModel;
