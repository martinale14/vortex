import express from 'express';
import { UserController } from '../controllers/user/user.controller';
import { verifyJWT } from '../middlewares/jwt.middleware';

const router = express.Router();

router.get('/user/email', verifyJWT, UserController.searchUser);

export default router;
