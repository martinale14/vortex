import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserInterface } from '../models/user.model';

const router = express.Router();

router.post('/register', async (req, res) => {
  const userInterface: UserInterface = req.body;

  console.log(userInterface);

  const { result, status } = await UserController.insertNewUser(userInterface);

  res.status(status).json({ msg: result });
});

export default router;
