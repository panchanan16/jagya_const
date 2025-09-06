const pool = require('@/config/dbConfig');
const entityQuerieModels = require('@/models/pagination');

class PaginationServices {
   async paginate({ entity, page, pageSize, search, entity_id }) {
      const offset = (page - 1) * pageSize;
      const queries = entityQuerieModels[entity];
      if (!queries) {
         throw new Error(`Pagination not configured for entity: ${entity}`);
      }
      let rows, total;
      if (entity_id) {
         [rows] = await pool.query(`${queries.sql} LIMIT ? OFFSET ?`, [entity_id,pageSize, offset]);
         [[{ total }]] = await pool.query(queries.countSql,[entity_id]);
      } else {
         [rows] = await pool.query(`${queries.sql} LIMIT ? OFFSET ?`, [pageSize, offset]);
         [[{ total }]] = await pool.query(queries.countSql);
      }
      return {
         data: rows,
         pagination: {
            total,
            pageSize,
            currentPage: page,
            lastPage: Math.ceil(total / pageSize),
            from: offset + 1,
            to: Math.min(offset + pageSize, total),
         },
      };
   }
}

module.exports = new PaginationServices();
