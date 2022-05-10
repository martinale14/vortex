import express from 'express';
import { UserController } from '../controllers/user/user.controller';
import { verifyJWT } from '../middlewares/jwt.middleware';

const router = express.Router();

router.get('/user/email', verifyJWT, UserController.searchUser);
router.get('/user/id', verifyJWT, UserController.getIdByJwt);

export default router;
