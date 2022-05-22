import express from 'express';
import { AuthController } from '../../controllers/auth/auth.controller';
import { UserController } from '../../controllers/user/user.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { verifyJWT } from '../../middlewares/jwt.middleware';

const router = express.Router();

router.post('/login', authenticate, AuthController.login);

router.get('/logout', AuthController.logout);

router.post('/register', verifyJWT, AuthController.register);

router.get('/users', verifyJWT, UserController.getAllUsers);

export default router;
