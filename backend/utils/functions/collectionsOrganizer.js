function organizeByPhase(data) {
   return data.reduce((result, item) => {
      const phase = item.col_project_phase;

      if (!result[phase]) {
         result[phase] = {
            phase,
            project_name: item.pro_name,
            client_name: item.client_name,
            total_amount: 0,
            total_pct: 0,
            payment_status: 'pending',
            payments: [],
            payment_summary: {
               full_payment: 0,
               partial_payment: 0,
               partial_completed: 0,
            },
         };
      }

      const amount = Number(item.col_amount || 0);
      const pct = Number(item.col_pct || 0);

      result[phase].payments.push({
         col_id: item.col_id,
         amount,
         mode: item.col_mode,
         type: item.col_type,
         category: item.col_category,
         pct,
         remark: item.col_remark,
         date: item.col_date,
         created_at: item.created_at,
      });

      result[phase].total_amount += amount;
      result[phase].total_pct += pct;

      if (item.col_type === 'full payment') {
         result[phase].payment_summary.full_payment += amount;
      } else if (item.col_type === 'partial payment') {
         result[phase].payment_summary.partial_payment += amount;
      } else {
         result[phase].payment_summary.partial_completed += amount;
      }

      if (item.col_type === 'full payment' || item.col_type === 'partial completed') {
         result[phase].payment_status = 'completed';
      }

      return result;
   }, {});
}

module.exports = organizeByPhase;
