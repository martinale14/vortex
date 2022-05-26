import express from 'express';
import TemplateController from '../controllers/template/template.controller';

const router = express.Router();

router.post('/', TemplateController.addTemplate);

router.get('/', TemplateController.getAllTemplates);

export default router;
