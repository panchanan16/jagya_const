const pool = require('@/config/dbConfig');

class FinanceDepAuthModel {
   constructor(fd_a_id, fd_r_id, fd_user_id, fd_password, fd_token, fd_isactive) {
      this.fd_a_id = fd_a_id;
      this.fd_r_id = fd_r_id;
      this.fd_user_id = fd_user_id;
      this.fd_password = fd_password;
      this.fd_token = fd_token;
      this.fd_isactive = fd_isactive;
   }

   static async findAll() {
      const query = 'SELECT fd_a_id, fd_r_id, fd_user_id, fd_password FROM finance_dep_auth';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving finance department auth records:', error);
      } finally {
         connPool.release();
      }
   }

   static async findOne(id) {
      const query = 'SELECT fd_a_id, fd_r_id, fd_user_id, fd_password FROM finance_dep_auth WHERE fd_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving finance department auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }

   static async create(fd_r_id, fd_user_id, fd_password) {
      const query = 'UPDATE finance_dep_auth SET fd_user_id=?, fd_password=? WHERE fd_r_id=? ';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [fd_user_id, fd_password, fd_r_id]);
         return result.affectedRows>0;
      } catch (error) {
         console.error('Error creating finance department auth record:', error);
      } finally {
         connPool.release();
      }
   }

   static async update(id, fd_r_id, fd_user_id, fd_password) {
      const query = 'UPDATE finance_dep_auth SET fd_r_id = ?, fd_user_id = ?, fd_password = ? WHERE fd_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [fd_r_id, fd_user_id, fd_password, id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating finance department auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }

   static async updatePassword(id, fd_password) {
      const query = 'UPDATE finance_dep_auth SET fd_password = ? WHERE fd_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [fd_password, id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating password for finance department auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }

   static async updateToken(id, fd_token) {
      const query = 'UPDATE finance_dep_auth SET fd_token = ? WHERE fd_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [fd_token, id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating token for finance department auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }
   static async findByLoginInfo(user_id) {
      const promisePool = await pool.getConnection();
      const selectUserSQL =
         'SELECT fd_a_id as id, fd_user_id as user_id, fd_password as password FROM finance_dep_auth WHERE fd_user_id = ? LIMIT 0,1';
      try {
         const [rows] = await promisePool.query(selectUserSQL, [user_id]);
         if (rows.length > 0) {
            const { id, password, user_id } = rows[0];
            return { id, password, user_id };
         }
         return null;
      } catch (error) {
         console.error(`Error Finding Info with user_id: ${user_id}:`, error);
      }
   }
   static async deleteOne(id) {
      const query = 'DELETE FROM finance_dep_auth WHERE fd_a_id = ?';
      const connPool = await pool.getConnection();
      try {
         await connPool.query(query, [id]);
         console.log(`Finance department auth record with ID ${id} deleted successfully.`);
      } catch (error) {
         console.error(`Error deleting finance department auth record with ID ${id}:`, error);
      } finally {
         connPool.release();
      }
   }
   static async updateIsActive(id, isActive) {
      const query = `UPDATE finance_dep_auth SET fd_isactive = ? WHERE a_id = ?`;
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
      const updateSQL = 'SELECT fd_a_id as id, fd_user_id as user_id FROM finance_dep_auth WHERE fd_token = ?';
      try {
         const [rows] = await promisePool.query(updateSQL, [refreshToken]);
         if (rows.length > 0) {
            return rows[0];
         }
         return null;
      } catch (error) {
         console.error(`Error retrieve userInfo finance_dep_auth !`, error);
      }
   }
   static async DeleteToken(refreshToken) {
      const promisePool = await pool.getConnection();
      const updateSQL = `UPDATE finance_dep_auth SET fd_token ='' WHERE fd_token = ?`;
      try {
         const [rows] = await promisePool.query(updateSQL, [refreshToken]);
         if (rows.length > 0) {
            return { status: true, msg: 'refresh token added!' };
         }
         return null;
      } catch (error) {
         console.error(`Error Updating refreshToken finance_dep_auth with ID:`, error);
      }
   }
}

module.exports = FinanceDepAuthModel;
