// Hello, this is a Model for Collections!

const pool = require('@/config/dbConfig');

class CollectionsModel {
   // Get all collections
   static async findAll(from_date, to_date) {
      let query = `
        SELECT 
          collections.*,
          projects.pro_name,
          c.client_name
        FROM collections
        JOIN projects ON collections.col_project_id = projects.pro_id
        LEFT JOIN clients c ON c.client_id = projects.pro_client_r_id
      `;

      const params = [];
      if (from_date && to_date) {
         query += ` WHERE DATE(collections.col_date) BETWEEN ? AND ? `;
         params.push(from_date, to_date);
      } else if (from_date) {
         query += ` WHERE DATE(collections.col_date) >= ? `;
         params.push(from_date);
      } else if (to_date) {
         query += ` WHERE DATE(collections.col_date) <= ? `;
         params.push(to_date);
      }

      query += ` ORDER BY collections.col_id DESC`;

      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, params);
         console.log(rows);
         return rows;
         
      } catch (err) {
         console.error('Error retrieving all collections:', err);
         throw err;
      } finally {
         connPool.release();
      }
   }

   // Get single collection
   static async findOne(col_id) {
      const query = `SELECT * FROM collections WHERE col_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [col_id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving collection with ID ${col_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Create collection
   static async create(
      col_amount,
      col_mode,
      col_remark,
      col_date,
      col_project_id,
      col_project_phase,
      col_type,
      col_category,
      col_pct
   ) {
      const query = `
        INSERT INTO collections (
          col_amount,
          col_mode,
          col_remark,
          col_date,
          col_project_id,
          col_project_phase,
          col_type,
          col_category,
          col_pct
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            col_amount,
            col_mode,
            col_remark,
            col_date,
            col_project_id,
            col_project_phase,
            col_type,
            col_category,
            col_pct,
         ]);

         if (result.affectedRows > 0) {
            return {
               col_id: result.insertId,
               col_amount,
               col_mode,
               col_remark,
               col_date,
               col_project_id,
               col_project_phase,
               col_type,
               col_category,
               col_pct,
            };
         }
      } catch (error) {
         console.error('Error creating collection:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Update collection
   static async update(
      col_id,
      col_amount,
      col_mode,
      col_remark,
      col_date,
      col_project_id,
      col_project_phase,
      col_type,
      col_category,
      col_pct
   ) {
      const query = `
        UPDATE collections SET
          col_amount = ?,
          col_mode = ?,
          col_remark = ?,
          col_date = ?,
          col_project_id = ?,
          col_project_phase = ?,
          col_type = ?,
          col_category = ?,
          col_pct = ?
        WHERE col_id = ?
      `;

      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            col_amount,
            col_mode,
            col_remark,
            col_date,
            col_project_id,
            col_project_phase,
            col_type,
            col_category,
            col_pct,
            col_id,
         ]);

         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating collection with ID ${col_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Delete collection
   static async remove(col_id) {
      const query = `DELETE FROM collections WHERE col_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [col_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting collection with ID ${col_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = CollectionsModel;
