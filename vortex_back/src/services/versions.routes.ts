import express from 'express';
import { VersionController } from '../controllers/version/version.controller';

const router = express.Router();

router.post('/', VersionController.createVersion);

export default router;
