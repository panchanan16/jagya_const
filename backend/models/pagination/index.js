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
};
