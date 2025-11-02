const pool = require('@/config/dbConfig');

class ClientModel {
   constructor(clientName, clientRefNo, clientContact, clientAltContact, clientAddress, clientEmail) {
      this.clientName = clientName;
      this.clientContact = clientContact;
      this.clientRefNo = clientRefNo;
      this.clientAltContact = clientAltContact;
      this.clientAddress = clientAddress;
      this.clientEmail = clientEmail;
   }
   static async getLastClientRef() {
      const query = 'SELECT client_ref_no FROM clients ORDER BY client_id DESC LIMIT 1';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving all clients:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
   static async getClientProjects(client_id) {
      const query = `
            SELECT c.client_id, c.client_name, p.pro_id, p.pro_ref_no, p.pro_name 
            FROM clients c
            LEFT JOIN projects p ON c.client_id = p.pro_client_r_id WHERE client_id=?`;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [client_id]);
         return rows;
      } catch (error) {
         console.error('Error retrieving client projects:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async getFinancesByProjectRef(projectRefNo) {
      if (!projectRefNo) {
         throw new Error('Project Reference Number is required.');
      }
      const collectionQuery = 'SELECT * FROM collections WHERE col_project_id = ?';
      const expenseQuery = 'SELECT * FROM expenses WHERE exp_project_ref = ?';
      const connPool = await pool.getConnection();

      try {
         const [collections] = await connPool.query(collectionQuery, [projectRefNo]);
         const [expenses] = await connPool.query(expenseQuery, [projectRefNo]);
         return {
            collections: collections,
            expenses: expenses,
            requests: [{
               "mr_r_id": 19,
               "material_ref_no": "JGCMRQ0008",
               "mr_project_id": 30,
               "mr_phase": "Phase 33",
               "mr_date": "2025-10-26",
               "created_at": "2025-10-26T14:33:43.000Z",
               "pro_name": "2 BHK house",
               "pro_ref_no": "ACME-202374",
               "client_name": "Ravi  Das"
            },
            {
               "mr_r_id": 17,
               "material_ref_no": "JGCMRQ0007",
               "mr_project_id": 11,
               "mr_phase": "Phase 1",
               "mr_date": "2025-04-03",
               "created_at": "2025-07-12T15:15:15.000Z",
               "pro_name": "Lakeview Resort",
               "pro_ref_no": "JGCP0004",
               "client_name": "tata industry  motor"
            },
            {
               "mr_r_id": 15,
               "material_ref_no": "JGCMRQ0006",
               "mr_project_id": 11,
               "mr_phase": "Phase 1",
               "mr_date": "2025-04-03",
               "created_at": "2025-07-12T14:50:18.000Z",
               "pro_name": "Lakeview Resort",
               "pro_ref_no": "JGCP0004",
               "client_name": "tata industry  motor"
            },
            {
               "mr_r_id": 14,
               "material_ref_no": "JGCMRQ0005",
               "mr_project_id": 11,
               "mr_phase": "Phase 1",
               "mr_date": "2025-04-03",
               "created_at": "2025-05-11T08:06:53.000Z",
               "pro_name": "Lakeview Resort",
               "pro_ref_no": "JGCP0004",
               "client_name": "tata industry  motor"
            }]
         };
      } catch (error) {
         console.error('Error retrieving project finances:', error);
         throw error;
      } finally {
         if (connPool) {
            connPool.release();
         }
      }
   }
}

module.exports = ClientModel;
