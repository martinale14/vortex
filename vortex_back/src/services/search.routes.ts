import express from 'express';
import { UserController } from '../controllers/user/user.controller';

const router = express.Router();

router.get('/user/email', UserController.searchUser);
router.get('/user/id', UserController.getIdByJwt);

export default router;
