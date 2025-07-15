// Hello, this is a Controller for projectDocs!
const ProjectDocsModel = require('@/models/entityModels/projectDocsModel');

class ProjectDocsController {
   // Get all project documents
   static async findAll(req, res) {
      try {
         const { pro_r_id } = req.query;
         const data = await ProjectDocsModel.findAll(pro_r_id);
         return res.status(200).send({ status: true, msg: 'Project documents retrieved successfully', data });
      } catch (error) {
         console.error('Error fetching project documents:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error' });
      }
   }

   // Get a single project document by ID
   static async findOne(req, res) {
      try {
         const { pro_doc_id, pro_r_id } = req.body;
         const data = await ProjectDocsModel.findOne(pro_doc_id, pro_r_id);
         if (!data) {
            return res.status(404).send({ status: false, msg: 'Project document not found' });
         }
         return res.status(200).send({ status: true, msg: 'Project document retrieved successfully', data });
      } catch (error) {
         console.error(`Error fetching project document with pro_doc_id ${req.body.pro_doc_id}:`, error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error' });
      }
   }

   // Create a new project document
   static async create(req, res) {
      try {
         const { pro_r_id, pro_doc_url } = req.body;
         if (!pro_r_id || !pro_doc_url) {
            return res.status(400).send({ status: false, msg: 'Missing required fields' });
         }
         const docId = await ProjectDocsModel.create(pro_r_id, pro_doc_url);
         return res.status(201).send({ status: true, msg: 'Project document added successfully', data: docId });
      } catch (error) {
         console.error('Error adding project document:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error' });
      }
   }

   // Update an existing project document
   static async update(req, res) {
      try {
         const { pro_doc_id, pro_r_id, pro_doc_url } = req.body;
         const updated = await ProjectDocsModel.update(pro_doc_id, pro_r_id, pro_doc_url);
         if (!updated) {
            return res.status(404).send({ status: false, msg: 'Project document not found or no changes made' });
         }
         return res.status(200).send({ status: true, msg: 'Project document updated successfully' });
      } catch (error) {
         console.error(`Error updating project document with pro_doc_id ${req.body.pro_doc_id}:`, error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error' });
      }
   }

   // Delete a project document
   static async remove(req, res) {
      try {
         const { pro_doc_id } = req.query;
         const deleted = await ProjectDocsModel.remove(pro_doc_id);
         if (!deleted) {
            return res.status(404).send({ status: false, msg: 'Project document not found' });
         }
         return res.status(200).send({ status: true, msg: 'Project document deleted successfully', data: pro_doc_id });
      } catch (error) {
         console.error(`Error deleting project document with pro_doc_id ${req.body.pro_doc_id}:`, error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error' });
      }
   }
}

module.exports = ProjectDocsController;
