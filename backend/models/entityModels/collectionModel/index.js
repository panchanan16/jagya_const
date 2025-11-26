// Hello, this is a Model for Collections!

const pool = require('@/config/dbConfig');

class CollectionsModel {
   constructor(col_amount, col_mode, col_remark, col_date, col_project_id) {
      this.col_amount = col_amount;
      this.col_mode = col_mode;
      this.col_remark = col_remark;
      this.col_date = col_date;
      this.col_project_id = col_project_id;
   }

   // Get all collectionss
   static async findAll(from_date, to_date) {
   let query = `
      SELECT collections.*, projects.pro_name, c.client_name
      FROM collections
      JOIN projects ON collections.col_project_id = projects.pro_ref_no
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

   query += ` ORDER BY collections.col_id DESC;`;

   const connPool = await pool.getConnection();

   try {
      const [rows] = await connPool.query(query, params);
      return rows;
   } catch (error) {
      console.error('Error retrieving all collections:', error);
      throw error;
   } finally {
      connPool.release();
   }
}


   // Get a single collections by ID
   static async findOne(col_id) {
      const query = 'SELECT * FROM collections WHERE col_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [col_id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving collections with ID ${col_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Create a new collections
   static async create(col_amount, col_mode, col_remark, col_date, col_project_id, col_project_phase) {
      const query = `INSERT INTO collections (col_amount, col_mode, col_remark, col_date, col_project_id,col_project_phase) VALUES (?, ?, ?, ?, ?,?)`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            col_amount,
            col_mode,
            col_remark,
            col_date,
            col_project_id,
            col_project_phase,
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
            };
         }
      } catch (error) {
         console.error('Error creating collections:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Update an existing collections
   static async update(col_id, col_amount, col_mode, col_remark, col_date, col_project_id, col_project_phase) {
      const query = `UPDATE collections 
                     SET col_amount = ?, col_mode = ?, col_remark = ?, col_date = ?, col_project_id = ? ,col_project_phase=?
                     WHERE col_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            col_amount,
            col_mode,
            col_remark,
            col_date,
            col_project_id,
            col_project_phase,
            col_id,
         ]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating collections with ID ${col_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   // Delete a collections
   static async remove(col_id) {
      const query = 'DELETE FROM collections WHERE col_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [col_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting collections with ID ${col_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = CollectionsModel;
