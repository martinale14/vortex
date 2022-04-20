import express from 'express';
import { HistoryController } from '../controllers/history/history.controller';

const router = express.Router();

router.post('/', HistoryController.createHistory);

export default router;
