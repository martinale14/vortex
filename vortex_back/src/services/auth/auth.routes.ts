import express from 'express';
import { AuthController } from '../../controllers/auth/auth.controller';
import { UserController } from '../../controllers/user/user.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { verifyJWT } from '../../middlewares/jwt.middleware';
import { body } from 'express-validator';
import multer from 'multer';

const router = express.Router();

router.post('/login', authenticate, AuthController.login);

router.get('/logout', AuthController.logout);

router.post('/fogetPassword', AuthController.forgetPassword);

router.post('/register', verifyJWT, AuthController.register);

router.get('/users', verifyJWT, UserController.getAllUsers);

router.put(
  '/users/update',
  verifyJWT,
  body('email').isEmail(),
  body('id').isNumeric(),
  body('name').exists(),
  body('phone').exists(),
  UserController.updateUser
);

router.put('/users/update/picture', verifyJWT, multer().single('file'), UserController.updateProfilePicture);

export default router;
