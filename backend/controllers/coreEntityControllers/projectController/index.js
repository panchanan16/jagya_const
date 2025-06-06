const projectCoreModel = require('@/models/coreEntityModels/projectModel');

class projectCoreController {
   static async getFullProject_OtherDetails_(req, res) {
      const { pro_id } = req.params;

      try {
         const rawData = await projectCoreModel.getProjectDetails(pro_id);
         const structuredData = {
            contractors:
               rawData[0]?.map((contractor) => ({
                  pro_con_id: contractor.pro_con_id,
                  pro_id: contractor.pro_id,
                  con_id: contractor.con_id,
                  pro_phase: contractor.pro_phase,
                  pro_sub_phase: contractor.pro_sub_phase,
                  con_name: contractor.con_name,
               })) || [],

            phases:
               rawData[1]?.reduce((acc, phase) => {
                  const existingPhase = acc.find((p) => p.pro_phase_id === phase.pro_phase_id);

                  if (!existingPhase) {
                     const newPhase = {
                        pro_phase_id: phase.pro_phase_id,
                        phase_id: phase.phase_id,
                        pro_id: phase.pro_id,
                        pro_phase_status: phase.pro_phase_status,
                        pro_phase_deadline: phase.pro_phase_deadline,
                        created_at: phase.created_at,
                        subphases: [],
                     };

                     if (phase.pro_subphase_id) {
                        newPhase.subphases.push({
                           pro_subphase_id: phase.pro_subphase_id,
                           pro_phase: phase.pro_phase,
                           pro_subphase: phase.pro_subphase,
                           deadline: phase.deadline,
                        });
                     }

                     newPhase.phase_name = phase.phase_name;
                     newPhase.phase_alt_name = phase.phase_alt_name;

                     acc.push(newPhase);
                  } else if (phase.pro_subphase_id) {
                     existingPhase.subphases.push({
                        pro_subphase_id: phase.pro_subphase_id,
                        pro_phase: phase.pro_phase,
                        pro_subphase: phase.pro_subphase,
                        deadline: phase.deadline,
                     });
                  }

                  return acc;
               }, []) || [],
            documents: rawData[2],
            client: rawData[3],
         };

         res.status(200).send({
            status: true,
            msg: 'Project Data retrieved successfully',
            data: structuredData,
         });
      } catch (error) {
         console.error('Create Error:', error);
         res.status(500).send({
            status: false,
            msg: 'Failed to get data',
            data: null,
         });
      }
   }
}

module.exports = projectCoreController;
