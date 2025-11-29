// Hello, this is a Model for client!

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
   static async findAll() {
      const query = 'SELECT * FROM clients ORDER BY client_id DESC;';
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

   static async findOne(clientId) {
      const query = 'SELECT * FROM clients WHERE client_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [clientId]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving client with ID ${clientId}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async create(clientName, clientRefNo, clientContact, clientAltContact, clientAddress, clientEmail) {
      const query = `INSERT INTO clients (client_name, client_ref_no, client_contact, client_alt_contact, client_address, client_email) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            clientName,
            clientRefNo,
            clientContact,
            clientAltContact,
            clientAddress,
            clientEmail,
         ]);
         if (result.affectedRows > 0) {
            let affectedData = {
               client_id: result.insertId,
               client_name: clientName,
               client_ref_no: clientRefNo,
               client_contact: clientContact,
               client_alt_contact: clientAltContact,
               client_address: clientAddress,
               client_email: clientEmail,
            };
            
            return affectedData;
         }
      } catch (error) {
         console.error('Error creating client:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async update(clientId, clientName, clientRefNo, clientContact, clientAltContact, clientAddress, clientEmail) {
      const query = `UPDATE clients 
                     SET client_name = ?, client_ref_no = ?, client_contact = ?, client_alt_contact = ?, client_address = ?, client_email = ? 
                     WHERE client_id = ?`;
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            clientName,
            clientRefNo,
            clientContact,
            clientAltContact,
            clientAddress,
            clientEmail,
            clientId,
         ]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating client with ID ${clientId}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async remove(clientId) {
      const query = 'DELETE FROM clients WHERE client_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [clientId]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting client with ID ${clientId}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = ClientModel;
