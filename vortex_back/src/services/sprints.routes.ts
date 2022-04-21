import express from 'express';
import { SprintController } from '../controllers/sprint/sprint.controller';

const router = express.Router();

router.get('/fromProject/:idProject', SprintController.getSprintsByProject);

router.post('/', SprintController.createSprint);

export default router;
