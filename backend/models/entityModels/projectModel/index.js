const pool = require('@/config/dbConfig');

class ProjectModel {
   constructor(
      pro_id,
      pro_client_r_id,
      pro_name,
      pro_ref_no,
      pro_housetype,
      pro_sitedesc,
      pro_duration,
      pro_totalcost,
      pro_advancepayment
   ) {
      this.pro_id = pro_id;
      this.pro_client_r_id = pro_client_r_id;
      this.pro_name = pro_name;
      this.pro_ref_no = pro_ref_no;
      this.pro_housetype = pro_housetype;
      this.pro_rcctype = pro_rcctype;
      this.pro_sitedesc = pro_sitedesc;
      this.pro_duration = pro_duration;
      this.pro_totalcost = pro_totalcost;
      this.pro_advancepayment = pro_advancepayment;
   }

   static async findAll() {
      const query = 'SELECT p.*,c.client_name FROM projects p LEFT JOIN clients c ON c.client_id=p.pro_client_r_id ORDER BY p.pro_id DESC;';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows.length ? rows : null;
      } catch (error) {
         console.error('Error retrieving all projects:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async findOne(pro_id) {
      const query = 'SELECT * FROM projects WHERE pro_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [pro_id]);
         return rows.length ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving project with ID ${pro_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async create(data) {
      const query = `INSERT INTO projects (pro_client_r_id, pro_name, pro_ref_no, pro_housetype, pro_sitedesc, pro_duration, pro_totalcost, pro_advancepayment)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            data.pro_client_r_id,
            data.pro_name,
            data.newProjectRef,
            data.pro_housetype,
            data.pro_sitedesc,
            data.pro_duration,
            data.pro_totalcost,
            data.pro_advancepayment,
         ]);
         return result.insertId;
      } catch (error) {
         console.error('Error creating project:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async update(data) {
      const query = `UPDATE projects SET pro_client_r_id=?, pro_name=?, pro_ref_no=?, pro_housetype=?, pro_sitedesc=?, pro_duration=?, pro_totalcost=?, pro_advancepayment=?
      WHERE pro_id=?`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            data.pro_client_r_id,
            data.pro_name,
            data.pro_ref_no,
            data.pro_housetype,
            data.pro_sitedesc,
            data.pro_duration,
            data.pro_totalcost,
            data.pro_advancepayment,
            data.pro_id
         ]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating project with ID ${data.pro_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async remove(pro_id) {
      const query = 'DELETE FROM projects WHERE pro_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [pro_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting project with ID ${pro_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = ProjectModel;
