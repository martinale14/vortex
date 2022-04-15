import express from 'express';
import { UserController } from '../controllers/user.controller';
import { User } from '../models/user.model';

const router = express.Router();

router.get('/user/email', async (req, res) => {
  if (req.body.email === undefined) {
    res.json({ result: 'Parametro email no detectado', status: 400 });
  }

  const { result, statusRes, user } = await UserController.getUserByEmail(req.body.email);

  let jsonRes: { [keys: string]: any } = { msg: 'Error inesperado' };
  let status: number = 404;

  if (result !== undefined && statusRes !== undefined) {
    jsonRes = { msg: result };
    status = statusRes;
  }

  if (user != null) {
    jsonRes = (user as User).toJson();
    status = 200;
  }

  res.status(status).json(jsonRes);
});

export default router;
