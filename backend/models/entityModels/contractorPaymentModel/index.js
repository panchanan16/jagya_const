const pool = require('@/config/dbConfig');

class PayModel {
   // Get all payments (optionally by contractor)
   static async findAll(pay_con_id) {
      let query = `SELECT * FROM contractor_payments`;
      const params = [];
      if (pay_con_id) {
         query += ` WHERE pay_con_id = ?`;
         params.push(pay_con_id);
      }
      query += ` ORDER BY pay_id DESC`;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, params);
         return rows;
      } catch (error) {
         console.error('Error retrieving all payments:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Get single payment
   static async findOne(pay_id) {
      const query = `SELECT * FROM contractor_payments WHERE pay_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [pay_id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving payment with ID ${pay_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Create payment
   static async create(
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
   ) {
      const query = `
         INSERT INTO contractor_payments (
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
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
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
         ]);

         if (result.affectedRows > 0) {
            return {
               pay_id: result.insertId,
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
            };
         }
      } catch (error) {
         console.error('Error creating payment:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Update payment
   static async update(
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
   ) {
      const query = `
         UPDATE contractor_payments SET
            pay_con_id = ?,
            pay_project_id = ?,
            pay_date = ?,

            pay_amount = ?,
            pay_mode = ?,
            pay_note = ?,
            pay_exp_id = ?,

            pay_total_bill = ?,
            pay_tds = ?,
            pay_payable = ?,
            pay_previous = ?,
            pay_grand_total = ?,
            pay_pending = ?,

            pay_labour = ?,
            pay_work_status = ?,
            pay_sqft = ?
         WHERE pay_id = ?
      `;

      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
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

            pay_id,
         ]);

         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating payment with ID ${pay_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Delete payment
   static async remove(pay_id) {
      const query = `DELETE FROM contractor_payments WHERE pay_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [pay_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting payment with ID ${pay_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = PayModel;
