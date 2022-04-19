import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.get('/user/email', UserController.searchUser);

export default router;
