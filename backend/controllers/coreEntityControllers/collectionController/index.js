const collectionModel = require('@/models/coreEntityModels/collectionModel');

class collectionsCoreController {
   static organizeProjectPayments(data) {
      const projectInfo = data[0][0]; // project details
      const payments = data[1]; // collections

      console.log(data);
      
      const totalCost = Number(projectInfo.pro_totalcost);

      const phases = payments.reduce((acc, item) => {
         const phase = item.col_project_phase;
         const pct = Number(item.col_pct || 0);

         if (!acc[phase]) {
            acc[phase] = {
               phase,
               total_pct: 0,
               phase_amount: 0,
               payment_status: 'pending',
               payments: [],
            };
         }

         acc[phase].total_pct += pct;

         acc[phase].payments.push({
            col_id: item.col_id,
            type: item.col_type,
            pct,
            mode: item.col_mode,
            remark: item.col_remark,
            date: item.col_date,
         });

         // 🔹 Payment status logic
         if (item.col_type === 'full payment' || item.col_type === 'partial completed') {
            acc[phase].payment_status = 'completed';
         }

         return acc;
      }, {});

      // Calculate phase amount
      Object.values(phases).forEach((phase) => {
         phase.phase_amount = (totalCost * phase.total_pct) / 100;
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
         const organizeData = collectionsCoreController.organizeProjectPayments(data)
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
