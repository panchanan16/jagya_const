const pool = require('@/config/dbConfig');

class AnalyticsCoreModel {
   constructor() {}
   static async getTotalProjects() {
      const query = 'SELECT COUNT(*) as count FROM projects';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].count;
      } catch (error) {
         console.error('Error retrieving total projects:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalRevenue() {
      const query = `
      SELECT SUM(CAST(col_amount AS DECIMAL(10,2))) as total 
      FROM collections
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].total || 0;
      } catch (error) {
         console.error('Error retrieving total revenue:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalExpenses() {
      const query = `
      SELECT SUM(CAST(exp_amount AS DECIMAL(10,2))) as total 
      FROM expenses
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].total || 0;
      } catch (error) {
         console.error('Error retrieving total expenses:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalUsers() {
      const queries = [
         'SELECT COUNT(*) as count FROM branch_auth WHERE br_isactive = 1',
         'SELECT COUNT(*) as count FROM finance_dep_auth WHERE fd_isactive = 1',
         'SELECT COUNT(*) as count FROM superviser_auth WHERE sup_isactive = 1',
         'SELECT COUNT(*) as count FROM super_admin_auth WHERE su_isactive = 1',
      ];

      const connPool = await pool.getConnection();
      try {
         const [branch] = await connPool.query(queries[0]);
         const [finance] = await connPool.query(queries[1]);
         const [supervisor] = await connPool.query(queries[2]);
         const [admin] = await connPool.query(queries[3]);

         return branch[0].count + finance[0].count + supervisor[0].count + admin[0].count;
      } catch (error) {
         console.error('Error retrieving total users:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalClients() {
      const query = 'SELECT COUNT(*) as count FROM clients';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].count;
      } catch (error) {
         console.error('Error retrieving total clients:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalVendors() {
      const query = 'SELECT COUNT(*) as count FROM vendors';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].count;
      } catch (error) {
         console.error('Error retrieving total vendors:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalContractors() {
      const query = 'SELECT COUNT(*) as count FROM contractors';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].count;
      } catch (error) {
         console.error('Error retrieving total contractors:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalLabours() {
      const query = 'SELECT COUNT(*) as count FROM labours';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].count;
      } catch (error) {
         console.error('Error retrieving total labours:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getTotalBranches() {
      const query = 'SELECT COUNT(*) as count FROM branch_data';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0].count;
      } catch (error) {
         console.error('Error retrieving total branches:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getProjectsByStatus() {
      const query = `
      SELECT 
        SUM(CASE WHEN pro_advancepayment > 0 AND pro_advancepayment < pro_totalcost THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN pro_advancepayment = pro_totalcost THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN pro_advancepayment = 0 THEN 1 ELSE 0 END) as not_started
      FROM projects
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows[0];
      } catch (error) {
         console.error('Error retrieving projects by status:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getProjectsByType() {
      const query = `
      SELECT 
        pro_housetype as type,
        COUNT(*) as count
      FROM projects
      GROUP BY pro_housetype
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving projects by type:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getProjectsTimeline() {
      const query = `
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM projects
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month
      LIMIT 12
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving projects timeline:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getRevenueByMonth() {
      const query = `
      SELECT 
        DATE_FORMAT(STR_TO_DATE(col_date, '%Y-%m-%d'), '%Y-%m') as month,
        SUM(CAST(col_amount AS DECIMAL(10,2))) as amount
      FROM collections
      WHERE col_date IS NOT NULL
      GROUP BY DATE_FORMAT(STR_TO_DATE(col_date, '%Y-%m-%d'), '%Y-%m')
      ORDER BY month
      LIMIT 12
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving revenue by month:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getExpensesByMonth() {
      const query = `
      SELECT 
        DATE_FORMAT(STR_TO_DATE(exp_date, '%Y-%m-%d'), '%Y-%m') as month,
        SUM(CAST(exp_amount AS DECIMAL(10,2))) as amount
      FROM expenses
      WHERE exp_date IS NOT NULL
      GROUP BY DATE_FORMAT(STR_TO_DATE(exp_date, '%Y-%m-%d'), '%Y-%m')
      ORDER BY month
      LIMIT 12
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving expenses by month:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getExpenseCategories() {
      const query = `
      SELECT 
        exp_category as category,
        SUM(CAST(exp_amount AS DECIMAL(10,2))) as amount
      FROM expenses
      GROUP BY exp_category
      ORDER BY amount DESC
      LIMIT 10
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving expense categories:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getRecentProjects() {
      const query = `
      SELECT 
        pro_id as id,
        pro_name as name,
        pro_ref_no as ref_no,
        pro_totalcost as total_cost,
        created_at
      FROM projects
      ORDER BY created_at DESC
      LIMIT 5
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving recent projects:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getRecentClients() {
      const query = `
      SELECT 
        client_id as id,
        client_name as name,
        client_ref_no as ref_no,
        client_contact as contact
      FROM clients
      ORDER BY client_id DESC
      LIMIT 5
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving recent clients:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getRecentExpenses() {
      const query = `
      SELECT 
        exp_id as id,
        exp_name as name,
        exp_amount as amount,
        exp_date as date
      FROM expenses
      ORDER BY exp_id DESC
      LIMIT 5
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving recent expenses:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getRecentCollections() {
      const query = `
      SELECT 
        col_id as id,
        col_amount as amount,
        col_mode as mode,
        col_date as date
      FROM collections
      ORDER BY col_id DESC
      LIMIT 5
    `;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving recent collections:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = AnalyticsCoreModel;
