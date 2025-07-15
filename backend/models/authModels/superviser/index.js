const pool = require('@/config/dbConfig');

class SuperviserAuthModel {
   constructor(sup_a_id, sup_r_id, sup_user_id, sup_password, sup_token) {
      this.sup_a_id = sup_a_id;
      this.sup_r_id = sup_r_id;
      this.sup_user_id = sup_user_id;
      this.sup_password = sup_password;
      this.sup_token = sup_token;
   }

   static async findAll() {
      const query = 'SELECT sup_a_id, sup_r_id, sup_user_id, sup_password FROM superviser_auth';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving superviser auth records:', error);
      } finally {
         connPool.release();
      }
   }

   static async findOne(id) {
      const query = 'SELECT sup_a_id, sup_r_id, sup_user_id, sup_password FROM superviser_auth WHERE sup_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving superviser auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }

   static async create(sup_r_id, sup_user_id, sup_password) {
      const query = 'UPDATE superviser_auth SET sup_user_id=?, sup_password=? WHERE sup_r_id=?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [sup_user_id, sup_password,sup_r_id]);
         return result.affectedRows>0;
         
      } catch (error) {
         console.error('Error creating superviser auth record:', error);
      } finally {
         connPool.release();
      }
   }

   static async update(id, sup_r_id, sup_user_id) {
      const query = 'UPDATE superviser_auth SET sup_r_id = ?, sup_user_id = ? WHERE sup_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [sup_r_id, sup_user_id, id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating superviser auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }

   static async findByLoginInfo(user_id) {
      const promisePool = await pool.getConnection();
      const selectUserSQL =
         'SELECT sup_a_id as id, sup_user_id as user_id, sup_password as password FROM superviser_auth WHERE sup_user_id = ? LIMIT 0,1';
      try {
         const [rows] = await promisePool.query(selectUserSQL, [user_id]);
         if (rows.length > 0) {
            const { id, password, user_id } = rows[0];
            return { id, password, user_id };
         }
         return null;
      } catch (error) {
         console.error(`Error Finding Info  sup_admin with user_id: ${user_id}:`, error);
      }
   }

   static async updatePassword(id, sup_password) {
      const query = 'UPDATE superviser_auth SET sup_password = ? WHERE sup_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [sup_password, id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating password for superviser auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }

   static async updateToken(id, sup_token) {
      const query = 'UPDATE superviser_auth SET sup_token = ? WHERE sup_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [sup_token, id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating token for superviser auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }

   static async deleteOne(id) {
      const query = 'DELETE FROM superviser_auth WHERE sup_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         await connPool.query(query, [id]);
         console.log(`Superviser auth record with ID ${id} deleted successfully.`);
      } catch (error) {
         console.error(`Error deleting superviser auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }
   static async updateIsActive(id, isActive) {
      const query = `UPDATE superviser_auth SET sup_isactive = ? WHERE a_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [isActive, id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating isActive status in table ${tableName} for ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }
   static async getUserByToken(refreshToken) {
      const promisePool = await pool.getConnection();
      const updateSQL = 'SELECT sup_a_id as id, sup_user_id as user_id FROM superviser_auth WHERE sup_token = ?';
      try {
         const [rows] = await promisePool.query(updateSQL, [refreshToken]);
         if (rows.length > 0) {
            return rows[0];
         }
         return null;
      } catch (error) {
         console.error(`Error retrieve userInfo superviser_auth ln:128:`, error);
      }
   }
   static async DeleteToken(refreshToken) {
      const promisePool = await pool.getConnection();
      const updateSQL = `UPDATE superviser_auth SET sup_token ='' WHERE sup_token = ?`;
      try {
         const [rows] = await promisePool.query(updateSQL, [refreshToken]);
         if (rows.length > 0) {
            return { status: true, msg: 'refresh token added!' };
         }
         return null;
      } catch (error) {
         console.error(`Error Updating refreshToken superviser_auth with ID:`, error);
      }
   }
}

module.exports = SuperviserAuthModel;
