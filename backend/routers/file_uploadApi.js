require('module-alias/register');
const express = require('express');
const coreRouter = express.Router();
const createFileUploadMiddleware = require('../middleware/fileUploader');
const ProjectDocsModel = require('@/models/entityModels/projectDocsModel');
const fs = require('fs');
const path = require('path');

const uploadProject_Files = createFileUploadMiddleware({
   fieldName: 'file',
   allowedMimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
   ],
   uploadPath: 'public/project/files',
});
const uploadProject_Images = createFileUploadMiddleware({
   fieldName: 'image',
   allowedMimeTypes: ['image/jpeg', 'image/png'],
   uploadPath: 'public/project/images',
});
const uploadLabour_Images = createFileUploadMiddleware({
   fieldName: 'image',
   allowedMimeTypes: ['image/jpeg', 'image/png'],
   uploadPath: 'public/labour',
});

// [PROJECTS]-----------
coreRouter.post('/core/project/upload/file/:pro_r_id', uploadProject_Files, async (req, res) => {
   try {
      const { pro_r_id } = req.params;
      if (!pro_r_id) {
         return res.status(400).json({ status: false, msg: 'Missing pro_r_id' });
      }
      if (!req.file) {
         return res.status(400).json({ status: false, msg: 'File upload failed' });
      }
      const filePath = req.file.path.replace(/\\/g, '/'); 
      const file_name = req.file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z ]/g, '').trim().substring(0, 20);
      const insertedId = await ProjectDocsModel.create(pro_r_id, filePath,req.query.type||'doc_file',file_name);
      return res.status(200).json({
         status: true,
         msg: 'Project File uploaded and path stored successfully',
         filePath,
         insertedId,
      });
   } catch (error) {
      console.error('Error uploading project file:', error);
      return res.status(500).json({ status: false, msg: 'Internal Server Error' });
   }
});

coreRouter.post('/core/project/upload/image/:pro_r_id', uploadProject_Images, async (req, res) => {
   try {
      const { pro_r_id } = req.params;
      if (!pro_r_id || !req.file) {
         return res.status(400).json({ status: false, msg: 'Missing required fields or image' });
      }
      const imagePath = req.file.path.replace(/\\/g, '/');
      const file_name = req.file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z ]/g, '').trim().substring(0, 20);
      const insertedId = await ProjectDocsModel.create(pro_r_id, imagePath,req.query.type||'doc_image',file_name);
      return res.status(200).json({
         status: true,
         msg: 'Project Image uploaded and stored successfully',
         imagePath,
         insertedId,
      });
   } catch (error) {
      console.error('Error uploading project image:', error);
      return res.status(500).json({ status: false, msg: 'Internal Server Error' });
   }
});
coreRouter.delete('/core/project/file/delete/:pro_doc_id', async (req, res) => {
   try {
      const { pro_doc_id } = req.params;
      let deleted;
      if (!pro_doc_id) {return res.status(400).json({ status: false, msg: 'Missing pro_doc_id' });}
      const filePath = await ProjectDocsModel.findOne(pro_doc_id);
      if (!filePath) {
         return res.status(404).json({ status: false, msg: 'Document not found' });
      }
      const resolvedPath = path.resolve(filePath.pro_doc_url);
      if (fs.existsSync(resolvedPath)) {fs.unlinkSync(resolvedPath);
         deleted = await ProjectDocsModel.remove(pro_doc_id);
      }
      if (deleted) {return res.status(200).json({status: true,msg: 'Project document and file deleted successfully', data: filePath,});
      } else {
         return res.status(404).json({ status: false, msg: 'Document not found or already deleted' });
      }
   } catch (error) {
      console.error('Error deleting project document:', error);
      return res.status(500).json({ status: false, msg: 'Internal Server Error' });
   }
});



// [Labour]-----------
coreRouter.post('/core/labour/upload', uploadLabour_Images, (req, res, next) => {
   res.json({
      message: 'File uploaded successfully',
      file: req.file,
   });
});

module.exports = coreRouter;
