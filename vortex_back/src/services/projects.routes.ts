import express from 'express';
import { ProjectController } from '../controllers/project/project.controller';

const router = express.Router();

router.get('/:companyId', ProjectController.getProjectsByCompany);

router.post('/', ProjectController.createProject);

export default router;