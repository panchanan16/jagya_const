const ProjectPhaseModel = require('@/models/entityModels/project_phaseModel');

const ProjectPhaseController = {
   async findAll(req, res) {
      try {
         const data = await ProjectPhaseModel.findAll();
         res.status(200).send({ status: true, msg: 'All project phases retrieved', data });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error retrieving project phases', data: null });
      }
   },

   async findOne(req, res) {
      try {
         const data = await ProjectPhaseModel.findOne(req.query.pro_id);
         res.status(200).send({ status: true, msg: 'Project phase retrieved', data });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error retrieving project phase', data: null });
      }
   },

   async create(req, res) {
      try {
         const insertId = await ProjectPhaseModel.create(req.body);
         res.status(201).send({ status: true, msg: 'Project phase created', data: { pro_phase_id: insertId, ...req.body } });
      } catch (err) {
         console.log(err);

         res.status(500).send({ status: false, msg: 'Error creating project phase', data: null });
      }
   },

   async update(req, res) {
      try {
         const success = await ProjectPhaseModel.update(req.body.pro_phase_id, req.body);
         res.status(200).send({ status: success, msg: success ? 'Updated successfully' : 'Not found', data: null });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error updating project phase', data: null });
      }
   },

   async remove(req, res) {
      try {
         const success = await ProjectPhaseModel.delete(req.body.pro_phase_id);
         res.status(200).send({ status: success, msg: success ? 'Deleted successfully' : 'Not found', data: null });
      } catch (err) {
         res.status(500).send({ status: false, msg: 'Error deleting project phase', data: null });
      }
   },
};

module.exports = ProjectPhaseController;
