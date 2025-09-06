const pool = require('@/config/dbConfig');

class VendorModel {
   constructor(vendorName, vendorRefNo, vendorContact, vendorAltContact, vendorAddress, vendorEmail) {
      this.vendorName = vendorName;
      this.vendorContact = vendorContact;
      this.vendorRefNo = vendorRefNo;
      this.vendorAltContact = vendorAltContact;
      this.vendorAddress = vendorAddress;
      this.vendorEmail = vendorEmail;
   }
   static async getLastVendorRef() {
      const query = 'SELECT vendor_ref_no FROM vendors ORDER BY vendor_id DESC LIMIT 1';
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query);
         return rows;
      } catch (error) {
         console.error('Error retrieving all vendors:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
   static async getVendor_Purcheses_Payments(vendor_id) {
      const query = `SELECT * FROM vendor_payments WHERE pay_vendor_id=?;
                     SELECT vendor_id ,mr_item_id, mr_project_r_id, mr_item_name, mr_item_quantity, mr_item_amount, mr_item_date FROM material_item_list WHERE vendor_id=? AND fd_approval=1;
                     SELECT (SELECT SUM(pay_amount) FROM vendor_payments WHERE pay_vendor_id = ?) AS total_payments,(SELECT SUM(mr_item_amount) FROM material_item_list WHERE vendor_id = ? AND fd_approval = 1) AS total_materials;
`;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [vendor_id,vendor_id,vendor_id,vendor_id]);
         return rows;
      } catch (error) {
         console.error('Error retrieving all vendors:', error);
         throw error;
      } finally {
         connPool.release();
      }
   }
}

module.exports = VendorModel;
