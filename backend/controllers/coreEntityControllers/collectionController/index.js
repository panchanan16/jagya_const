const collectionModel = require('@/models/coreEntityModels/collectionModel');

class collectionsCoreController {
   static organizeProjectPayments(data) {
      const projectInfo = data[0][0]; // project details
      const payments = data[1]; // collections

      const totalCost = Number(projectInfo.pro_totalcost);

      const phaseMap = payments.reduce((acc, item) => {
         const phase = item.col_project_phase;
         const amount = Number(item.col_amount ?? 0);

         console.log(acc, item);

         if (!acc[phase]) {
            acc[phase] = {
               phase,
               // total_pct: 0,
               phase_amount: 0,
               payment_status: 'pending',
               payments: [],
            };
         }
console.log(
  payments.map(p => ({
    col_id: p.col_id,
    col_amount: p.col_amount,
    typeof_amount: typeof p.col_amount
  }))
);
         acc[phase].phase_amount += amount;

         acc[phase].payments.push({
            col_id: item.col_id,
            type: item.col_type,
            // amount: item.col_amount,
            amount,
            mode: item.col_mode,
            remark: item.col_remark,
            date: item.col_date,
         });

         if (item.col_type === 'full payment' || item.col_type === 'partial completed') {
            acc[phase].payment_status = 'completed';
         }

         return acc;
      }, {});

      const phases = Object.values(phaseMap).map((phase) => {
         return { ...phase };
      });

      return {
         project: {
            pro_id: projectInfo.pro_id,
            total_cost: totalCost,
            advance_payment: projectInfo.pro_advancepayment,
         },
         phases,
      };
   }

   static async getCollectionDetailsBy_project(req, res) {
      try {
         const { pro_id } = req.params;
         const data = await collectionModel.getCollectionDetailsBy_project(pro_id);
         const organizeData = collectionsCoreController.organizeProjectPayments(data);
         return res.status(200).send({
            status: true,
            msg: 'Project Collections info retrieved successfully',
            data: organizeData,
         });
      } catch (error) {
         console.error('Error fetching Collections:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
}

module.exports = collectionsCoreController;
