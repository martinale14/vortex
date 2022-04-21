import express from 'express';
import { RouteController } from '../../controllers/route/route.controller';

const router = express.Router();

router.all('*', RouteController.routeNotFound);

export default router;
