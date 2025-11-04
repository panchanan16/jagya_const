
const pool = require('@/config/dbConfig');

class MaterialRequestModel {
   constructor(material_ref_no, mr_project_ref, mr_project_id, mr_phase, mr_date, created_at) {
      this.material_ref_no = material_ref_no;
      this.mr_project_ref = mr_project_ref;
      this.mr_project_id = mr_project_id;
      this.mr_phase = mr_phase;
      this.mr_date = mr_date;
      this.created_at = created_at;
   }

   static async findAll() {
      const query = 'SELECT mr.*,p.pro_name,p.pro_ref_no,c.* FROM material_requests mr LEFT JOIN projects p ON p.pro_id = mr.mr_project_id LEFT JOIN clients c ON c.client_id = p.pro_client_r_id ORDER BY mr.mr_r_id DESC';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving all material requests:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async findOne(mr_r_id) {
      const query = 'SELECT mr.*,p.pro_name,p.pro_ref_no,c.* FROM material_requests mr LEFT JOIN projects p ON p.pro_id = mr.mr_project_id LEFT JOIN clients c ON c.client_id = p.pro_client_r_id WHERE mr_r_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [mr_r_id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving material request with ID ${mr_r_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async create(material_ref_no, mr_project_ref, mr_project_id, mr_phase, mr_date, created_at) {
      const query = `INSERT INTO material_requests (material_ref_no, mr_project_ref, mr_project_id, mr_phase, mr_date, created_at) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            material_ref_no,
            mr_project_ref,
            mr_project_id,
            mr_phase,
            mr_date,
            created_at,
         ]);
         if (result.affectedRows > 0) {
            return {
               mr_r_id: result.insertId,
               material_ref_no,
               mr_project_ref,
               mr_project_id,
               mr_phase,
               mr_date,
               created_at,
            };
         }
      } catch (error) {
         console.error('Error creating material request:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async update(mr_r_id, material_ref_no, mr_project_ref, mr_project_id, mr_phase, mr_date, created_at) {
      const query = `UPDATE material_requests 
                     SET material_ref_no = ?, mr_project_ref = ?, mr_project_id = ?, mr_phase = ?, mr_date = ?, created_at = ? 
                     WHERE mr_r_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            material_ref_no,
            mr_project_ref,
            mr_project_id,
            mr_phase,
            mr_date,
            created_at,
            mr_r_id,
         ]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating material request with ID ${mr_r_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async remove(mr_r_id) {
      const query = 'DELETE FROM material_requests WHERE mr_r_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [mr_r_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting material request with ID ${mr_r_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async paginate(page, limit) {
      const offset = (page - 1) * limit;
      const query = 'SELECT * FROM material_requests LIMIT ? OFFSET ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [limit, offset]);
         return rows;
      } catch (error) {
         console.error('Error retrieving paginated material requests:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = MaterialRequestModel;
