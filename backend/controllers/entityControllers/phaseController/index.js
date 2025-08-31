const PhasesModel = require('@/models/entityModels/phaseModel');

class PhasesController {
  static async findAll(req, res) {
    try {
      const phases = await PhasesModel.findAll();
      res.status(200).send({ status: true, msg: 'Phases retrieved successfully', data: phases });
    } catch (error) {
      res.status(500).send({ status: false, msg: 'Failed to retrieve phases', data: null });
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.body;
      const phase = await PhasesModel.findOne(id);
      if (!phase) return res.status(404).send({ status: false, msg: 'Phase not found', data: null });
      res.status(200).send({ status: true, msg: 'Phase retrieved successfully', data: phase });
    } catch (error) {
      res.status(500).send({ status: false, msg: 'Failed to retrieve phase', data: null });
    }
  }

  static async create(req, res) {
    try {
      console.log(req.body)
      const { phase_name, phase_alt_name } = req.body;
      const insertId = await PhasesModel.create(phase_name, phase_alt_name);
      res.status(201).send({ status: true, msg: 'Phase created successfully', data: { phase_id: insertId, phase_name } });
    } catch (error) {
      res.status(500).send({ status: false, msg: 'Failed to create phase', data: null });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.body;
      const { phase_name, phase_alt_name } = req.body;
      const success = await PhasesModel.update(id, phase_name, phase_alt_name);
      if (!success) return res.status(404).send({ status: false, msg: 'Phase not found', data: null });
      res.status(200).send({ status: true, msg: 'Phase updated successfully', data: null });
    } catch (error) {
      res.status(500).send({ status: false, msg: 'Failed to update phase', data: null });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.body;
      const success = await PhasesModel.delete(id);
      if (!success) return res.status(404).send({ status: false, msg: 'Phase not found', data: null });
      res.status(200).send({ status: true, msg: 'Phase deleted successfully', data: {phase_id: id} });
    } catch (error) {
      res.status(500).send({ status: false, msg: 'Failed to delete phase', data: null });
    }
  }

 
}

module.exports = PhasesController;
