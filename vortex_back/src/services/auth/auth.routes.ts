import express from 'express';
import { AuthController } from '../../controllers/auth/auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', authenticate, AuthController.login);

router.get('/logout', AuthController.logout);

router.post('/register', AuthController.register);

export default router;
