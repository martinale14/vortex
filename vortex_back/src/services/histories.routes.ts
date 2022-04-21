import express from 'express';
import { HistoryController } from '../controllers/history/history.controller';

const router = express.Router();

router.get('/fromProject/:idProject', HistoryController.getHistoriesByProjectOrSprint);

router.get('/fromSprint/:idSprint', HistoryController.getHistoriesByProjectOrSprint);

router.post('/', HistoryController.createHistory);

export default router;
