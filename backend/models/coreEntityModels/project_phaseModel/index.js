const pool = require('@/config/dbConfig');

class projectModel {
   constructor() {}
   static async updatePhaseStatus(pro_phase_id, pro_phase_status) {
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query('UPDATE project_phase SET pro_phase_status = ? WHERE pro_phase_id = ?', [
            pro_phase_status,
            pro_phase_id,
         ]);

         return result.affectedRows > 0;
      } catch (error) {
         console.error('Error updating pro_phase_status:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
   static async getProject_PhaseList(pro_id) {
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query('SELECT p.phase_name,pp.* FROM project_phase pp LEFT JOIN phases p ON pp.phase_id=p.phase_id  WHERE pro_id =?;', [
           pro_id,
         ]);
         
         return result;
      } catch (error) {
         console.error('Error updating pro_phase_status:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = projectModel;
