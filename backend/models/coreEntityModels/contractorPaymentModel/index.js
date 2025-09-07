const pool = require('@/config/dbConfig');

class ExpenseModel {
   static async findAll_ByID(pay_con_id) {
      const query = `SELECT * FROM contractors WHERE con_id =?;
      SELECT cp.*,p.pro_name, p.pro_ref_no, e.exp_name ,e.exp_date FROM contractor_payments cp LEFT JOIN projects p ON p.pro_id =cp.pay_project_id LEFT JOIN expenses e ON e.exp_id=cp.pay_exp_id WHERE pay_con_id =?;
      SELECT pc.*,p.pro_name,p.pro_ref_no,p.pro_id FROM project_contractor pc LEFT JOIN projects p on p.pro_id =pc.pro_id WHERE con_id = ?;
      SELECT SUM(pay_amount) as total_amount FROM contractor_payments WHERE pay_con_id=?;`;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [pay_con_id, pay_con_id, pay_con_id, pay_con_id]);
         return rows;
      } catch (error) {
         console.error('Error retrieving all expenses:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}
module.exports = ExpenseModel;
