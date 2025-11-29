const entityQueries = {
  branch_clients: {
    sql: `
      SELECT * 
      FROM branch_clients
      WHERE 
        b_client_name LIKE ? OR
        b_client_ref_no LIKE ? OR
        b_client_contact LIKE ? OR
        b_client_email LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM branch_clients
      WHERE 
        b_client_name LIKE ? OR
        b_client_ref_no LIKE ? OR
        b_client_contact LIKE ? OR
        b_client_email LIKE ?
    `,
  },
  branch_data: {
    sql: `
      SELECT * 
      FROM branch_data
      WHERE 
        b_name LIKE ? OR
        b_location LIKE ? OR
        b_contact_number LIKE ? OR
        b_email LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM branch_data
      WHERE 
        b_name LIKE ? OR
        b_location LIKE ? OR
        b_contact_number LIKE ? OR
        b_email LIKE ?
    `,
  },
  client: {
    sql: `
      SELECT * 
      FROM clients
      WHERE 
        client_name LIKE ? OR
        client_ref_no LIKE ? OR
        client_contact LIKE ? OR
        client_email LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM clients
      WHERE 
        client_name LIKE ? OR
        client_ref_no LIKE ? OR
        client_contact LIKE ? OR
        client_email LIKE ?
    `,
  },
  contractor: {
    sql: `
      SELECT * 
      FROM contractors
      WHERE 
        con_name LIKE ? OR
        con_contact LIKE ? OR
        con_email LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM contractors
      WHERE 
        con_name LIKE ? OR
        con_contact LIKE ? OR
        con_email LIKE ?
    `,
  },
  expenses: {
    sql: `
      SELECT * 
      FROM expenses
      WHERE 
        exp_name LIKE ? OR
        exp_project_ref LIKE ? OR
        exp_remark LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM expenses
      WHERE 
        exp_name LIKE ? OR
        exp_project_ref LIKE ? OR
        exp_remark LIKE ?
    `,
  },
  labours: {
    sql: `
      SELECT * 
      FROM labours
      WHERE 
        lab_name LIKE ? OR
        lab_contact LIKE ? OR
        lab_email LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM labours
      WHERE 
        lab_name LIKE ? OR
        lab_contact LIKE ? OR
        lab_email LIKE ?
    `,
  },
  material_requests: {
    sql: `
      SELECT * 
      FROM material_requests
      WHERE 
        material_ref_no LIKE ? OR
        mr_project_id LIKE ? OR
        mr_phase LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM material_requests
      WHERE 
        material_ref_no LIKE ? OR
        mr_project_id LIKE ? OR
        mr_phase LIKE ?
    `,
  },
  project: {
    sql: `
      SELECT * 
      FROM projects
      WHERE 
        pro_name LIKE ? OR
        pro_ref_no LIKE ? OR
        pro_sitedesc LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM projects
      WHERE 
        pro_name LIKE ? OR
        pro_ref_no LIKE ? OR
        pro_sitedesc LIKE ?
    `,
  },
  vendor: {
    sql: `
      SELECT * 
      FROM vendors
      WHERE 
        vendor_name LIKE ? OR
        vendor_ref_no LIKE ? OR
        vendor_contact LIKE ? OR
        vendor_email LIKE ?
    `,
    countSql: `
      SELECT COUNT(*) AS total 
      FROM vendors
      WHERE 
        vendor_name LIKE ? OR
        vendor_ref_no LIKE ? OR
        vendor_contact LIKE ? OR
        vendor_email LIKE ?
    `,
  },
};

module.exports=entityQueries;