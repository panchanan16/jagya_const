//Hello, this is a Model for vendor!
const pool = require('@/config/dbConfig');
const sqlErrorHandler = require('@/utils/sqlErrorHandler');

class VendorsModel {
   constructor(
      vendor_id,
      vendor_name,
      vendor_contact,
      vendor_alt_contact,
      vendor_address,
      vendor_email,
      vendor_status
   ) {
      this.vendor_id = vendor_id;
      this.vendor_name = vendor_name;
      this.vendor_contact = vendor_contact;
      this.vendor_alt_contact = vendor_alt_contact;
      this.vendor_address = vendor_address;
      this.vendor_email = vendor_email;
      this.vendor_status = vendor_status;
   }

   static async findAll() {
      const query = 'SELECT * FROM vendors ORDER BY vendor_id DESC';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         sqlErrorHandler(error);
         console.error('Error retrieving all vendors:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async findOne(vendor_id) {
      const query = 'SELECT * FROM vendors WHERE vendor_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [vendor_id]);
         return rows.length > 0 ? rows[0] : null;
      } catch (error) {
         console.error(`Error retrieving vendor with ID ${vendor_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async create(vendor_name, vendor_ref_no, vendor_contact, vendor_alt_contact, vendor_address, vendor_email) {
      const query =
         'INSERT INTO vendors (vendor_name, vendor_ref_no, vendor_contact, vendor_alt_contact, vendor_address, vendor_email) VALUES (?, ?, ?, ?, ?, ?)';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            vendor_name,
            vendor_ref_no,
            vendor_contact,
            vendor_alt_contact,
            vendor_address,
            vendor_email
         ]);
         if (result.affectedRows > 0) {
            let affectedData = {
               vendor_id: result.insertId,
               vendor_ref_no: vendor_ref_no,
               vendor_name: vendor_name,
               vendor_contact: vendor_contact,
               vendor_alt_contact: vendor_alt_contact,
               vendor_address: vendor_address,
               vendor_email: vendor_email,
               vendor_status: "open"
            }
            return affectedData;
         }

      } catch (error) {
         console.error('Error creating vendor:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async update(
      vendor_id,
      vendor_name,
      vendor_contact,
      vendor_alt_contact,
      vendor_address,
      vendor_email,
      vendor_status
   ) {
      const query =
         'UPDATE vendors SET vendor_name = ?, vendor_contact = ?, vendor_alt_contact = ?, vendor_address = ?, vendor_email = ?, vendor_status = ? WHERE vendor_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [
            vendor_name,
            vendor_contact,
            vendor_alt_contact,
            vendor_address,
            vendor_email,
            vendor_status,
            vendor_id,
         ]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error updating vendor with ID ${vendor_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }

   static async delete(vendor_id) {
      const query = 'DELETE FROM vendors WHERE vendor_id = ?';
      const connPool = await pool.getConnection();
      try {
         const [result] = await connPool.query(query, [vendor_id]);
         return result.affectedRows > 0;
      } catch (error) {
         console.error(`Error deleting vendor with ID ${vendor_id}:`, error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = VendorsModel;
