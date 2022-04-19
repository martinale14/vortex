import express from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth/auth.controller';

const router = express.Router();

router.post('/login', passport.authenticate('local'), AuthController.login);

router.get('/logout', AuthController.logout);

router.post('/register', AuthController.register);

export default router;
