module.exports = {
   branch_client: {
      sql: `SELECT * FROM branch_clients`,
      countSql: `SELECT COUNT(*) AS total FROM branch_clients`,
   },

   branch_data: {
      sql: `SELECT * FROM branch_data`,
      countSql: `SELECT COUNT(*) AS total FROM branch_data`,
   },
   client: {
      sql: `SELECT * FROM clients`,
      countSql: `SELECT COUNT(*) AS total FROM clients`,
   },

   expense: {
      sql: `SELECT * FROM expenses`,
      countSql: `SELECT COUNT(*) AS total FROM expenses`,
   },

   invoice: {
      sql: `SELECT * FROM invoice`,
      countSql: `SELECT COUNT(*) AS total FROM invoice`,
   },

   material_request: {
      sql: `SELECT * FROM material_requests`,
      countSql: `SELECT COUNT(*) AS total FROM material_requests`,
   },

   project: {
      sql: `SELECT * FROM projects`,
      countSql: `SELECT COUNT(*) AS total FROM projects`,
   },
   vendor_payment: {
      sql: `SELECT * FROM vendor_payments WHERE pay_vendor_id=?`,
      countSql: `SELECT COUNT(*) AS total FROM vendor_payments WHERE pay_vendor_id=?`,
   },
   vendor_purchase: {
      sql: `SELECT vendor_id ,mr_item_id, mr_project_r_id, mr_item_name, mr_item_quantity, mr_item_amount, mr_item_date FROM material_item_list WHERE vendor_id=? AND fd_approval = 1`,
      countSql: `SELECT COUNT(*) AS total FROM material_item_list WHERE vendor_id=? AND fd_approval = 1`,
   },
   contractor_payment: {
      sql: `SELECT * FROM contractor_payments WHERE con_id=?`,
      countSql: `SELECT COUNT(*) AS total FROM contractor_payments WHERE con_id=?`,
   },
};
