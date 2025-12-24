const pool = require('@/config/dbConfig');

class ClientModel {
   constructor() {}
   static async getCollectionDetailsBy_project(pro_id) {
      const query ='SELECT pro_id, pro_totalcost ,pro_advancepayment FROM projects WHERE pro_id = ?; SELECT col_id,col_project_phase,col_type,col_pct,col_amount,col_mode,col_remark,col_date FROM collections WHERE col_project_id = ? ';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [pro_id, pro_id]);
         return rows;
      } catch (error) {
         console.error('Error retrieving all clients:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = ClientModel;
