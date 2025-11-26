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
                     SELECT v.vendor_name,p.pro_name,c.client_name, mil.vendor_id ,mil.mr_item_id, mil.mr_project_r_id, mil.mr_item_name, mil.mr_item_quantity, mil.mr_item_amount, mil.mr_item_date FROM material_item_list mil LEFT JOIN vendors v ON v.vendor_id=mil.vendor_id LEFT JOIN projects p on p.pro_id= mil.mr_project_r_id LEFT JOIN clients c ON c.client_id=p.pro_client_r_id WHERE mil.vendor_id=? AND mil.fd_approval=1;
                     SELECT (SELECT SUM(pay_amount) FROM vendor_payments WHERE pay_vendor_id = ?) AS total_payments,(SELECT SUM(mr_item_amount) FROM material_item_list WHERE vendor_id = ? AND fd_approval = 1) AS total_materials;
                     SELECT * FROM vendors WHERE vendor_id=?`;
      const connPool = await pool.getConnection();
      try {
         const [rows] = await connPool.query(query, [vendor_id, vendor_id, vendor_id, vendor_id, vendor_id]);
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
