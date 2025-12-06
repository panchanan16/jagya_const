//Hello, this is a Model for phase!
const pool = require('@/config/dbConfig');

class PhasesModel {
   constructor(phase_id, phase_name, phase_alt_name) {
      this.phase_id = phase_id;
      this.phase_name = phase_name;
      this.phase_alt_name = phase_alt_name;
   }

   static async findAll(pro_id) {
      const connPool = await pool.getConnection();
      try {
         let result;
         if (pro_id !== null && pro_id !== undefined) {
            const [rows] = await connPool.query(
               'SELECT p.phase_name, pp.* FROM project_phase pp LEFT JOIN phases p ON pp.phase_id = p.phase_id WHERE pro_id = ?',
               [pro_id]
            );
            if (rows.length > 0) {
               result = rows;
            } else {
               const [allPhases] = await connPool.query('SELECT * FROM phases');
               result = allPhases;
            }
         } else {
            const [allPhases] = await connPool.query('SELECT * FROM phases');
            result = allPhases;
         }

         return result;
      } catch (error) {
         console.error('Error retrieving all phases:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async findOne(phase_id) {
      const query = 'SELECT * FROM phases WHERE phase_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [phase_id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving phase with ID ${phase_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async create(phase_name, phase_alt_name) {
      const query = 'INSERT INTO phases (phase_name, phase_alt_name) VALUES (?, ?)';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [phase_name, phase_alt_name]);
         return result.insertId;
      } catch (error) {
         console.error('Error creating phase:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async update(phase_id, phase_name, phase_alt_name) {
      const query = 'UPDATE phases SET phase_name = ?, phase_alt_name = ? WHERE phase_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [phase_name, phase_alt_name, phase_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating phase with ID ${phase_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async delete(phase_id) {
      const query = 'DELETE FROM phases WHERE phase_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [phase_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting phase with ID ${phase_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = PhasesModel;
