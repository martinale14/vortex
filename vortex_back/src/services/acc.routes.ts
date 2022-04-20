import express from 'express';
import { AcceptanceCriteriaController } from '../controllers/acceptance_criteria/acc.controller';

const router = express.Router();

router.post('/', AcceptanceCriteriaController.createAcceptanceCriteria);

export default router;
