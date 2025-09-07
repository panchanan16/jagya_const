const pool = require('@/config/dbConfig');

class InvoiceModel {
   constructor(invoiceData, invoiceItems) {
      this.invoiceData = invoiceData;
      this.invoiceItems = invoiceItems;
   }

   static async createInvoiceWithItems(invoiceData, items) {
      const conn = await pool.getConnection();
      try {
         await conn.beginTransaction();
         const invoiceQuery = `INSERT INTO invoice (invoice_no, invoice_date, payment_status, amount, gst_rate, discount, total, client_contact, client_address, client_id,cliend_ref_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
         const [invoiceRes] = await conn.query(invoiceQuery, [
            invoiceData.invoice_no,
            invoiceData.invoice_date,
            invoiceData.payment_status,
            invoiceData.amount,
            invoiceData.gst_rate,
            invoiceData.discount,
            invoiceData.total,
            invoiceData.client_contact,
            invoiceData.client_address,
            invoiceData.client_id,
            invoiceData.cliend_ref_id,
         ]);
         const invoiceId = invoiceRes.insertId;
         for (const item of items) {
            const itemQuery = `INSERT INTO invoice_items (inv_item_name, inv_item_quantity, inv_item_rate, inv_item_amount, invoice_no)
            VALUES (?, ?, ?, ?, ?)`;
            await conn.query(itemQuery, [
               item.inv_item_name,
               item.inv_item_quantity,
               item.inv_item_rate,
               item.inv_item_amount,
               invoiceId,
            ]);
         }
         await conn.commit();
         return { invoice_id: invoiceId, ...invoiceData, items };
      } catch (error) {
         await conn.rollback();
         throw error;
      } finally {
         conn.release();
      }
   }
   static async findAll() {
      const conn = await pool.getConnection();
      try {
         const [invoices] = await conn.query(
            `SELECT * FROM invoice  ORDER BY created_at DESC`
         );
         return invoices;
      } finally {
         conn.release();
      }
   }

   static async findOne(id) {
      const conn = await pool.getConnection();
      try {
         const [invoice] = await conn.query(` SELECT * FROM invoice  WHERE invoice_id = ?`, [id]);
         const [items] = await conn.query(`SELECT * FROM invoice_items WHERE invoice_id = ?`, [id]);
         return { ...invoice[0], items };
      } finally {
         conn.release();
      }
   }

   static async update(invoiceId, invoiceData) {
      const query = `UPDATE invoice SET invoice_no=?, invoice_date=?, payment_status=?, amount=?, gst_rate=?, discount=?, total=?, client_contact=?, client_address=?, client_id=?,
            cliend_ref_id=?
                     WHERE invoice_id = ?`;
      const conn = await pool.getConnection();
      try {
         const [res] = await conn.query(query, [
            invoiceData.invoice_no,
            invoiceData.invoice_date,
            invoiceData.payment_status,
            invoiceData.amount,
            invoiceData.gst_rate,
            invoiceData.discount,
            invoiceData.total,
            invoiceData.client_contact,
            invoiceData.client_address,
            invoiceData.client_id,
            invoiceData.cliend_ref_id,
            invoiceId,
         ]);
         return res.affectedRows > 0;
      } finally {
         conn.release();
      }
   }

   static async remove(invoiceId) {
      const conn = await pool.getConnection();
      try {
         await conn.beginTransaction();
         await conn.query(`DELETE FROM invoice_items WHERE invoice_id = ?`, [invoiceId]);
         const [res] = await conn.query(`DELETE FROM invoice WHERE invoice_id = ?`, [invoiceId]);
         await conn.commit();
         return res.affectedRows > 0;
      } catch (err) {
         await conn.rollback();
         throw err;
      } finally {
         conn.release();
      }
   }

   static async updateInvoiceItem(invoice_item_id, data) {
      const query = `
             UPDATE invoice_items SET
        inv_item_name  = ?, inv_item_quantity = ?, inv_item_rate = ?, inv_item_amount = ?
       WHERE invoice_item_id = ?`;

      const values = [
         data.inv_item_name,
         data.inv_item_quantity,
         data.inv_item_rate,
         data.inv_item_amount,
         invoice_item_id,
      ];

      const conn = await pool.getConnection();
      try {
         const [result] = await conn.query(query, values);
         return result;
      } finally {
         conn.release();
      }
   }

   static async deleteInvoiceItem(invoice_item_id) {
      const conn = await pool.getConnection();
      try {
         const [result] = await conn.query('DELETE FROM invoice_items WHERE invoice_item_id = ?', [invoice_item_id]);
         return result;
      } finally {
         conn.release();
      }
   }
}
module.exports = InvoiceModel;
