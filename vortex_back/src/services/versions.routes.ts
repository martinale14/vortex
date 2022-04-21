import express from 'express';
import { VersionController } from '../controllers/version/version.controller';

const router = express.Router();

router.get('/lastVersion/:idHistory', VersionController.getLastVersionByHistory);

router.post('/', VersionController.createVersion);

export default router;
