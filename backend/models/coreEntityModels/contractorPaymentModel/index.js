const pool = require('@/config/dbConfig');

class ExpenseModel {
   static async findAll_ByID(pay_con_id) {
      const query = 'SELECT cp.*,p.pro_name, p.pro_ref_no, e.exp_name FROM contractor_payments cp LEFT JOIN projects p ON p.pro_id =cp.pay_project_id LEFT JOIN expenses e ON e.exp_id=cp.pay_exp_id WHERE pay_con_id =?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query,[pay_con_id]);
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
