import express from 'express';
import { JwtController } from '../../controllers/auth/jwt.controller';

const router = express.Router();

router.post('/', JwtController.generateTokenByRefreshToken);

router.post('/reject', JwtController.generateTokenByRefreshToken);

export default router;
