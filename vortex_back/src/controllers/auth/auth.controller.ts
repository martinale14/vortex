import { User, UserPayload } from '../../models/user/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { JwtController } from './jwt.controller';
import { getRoleName } from '../../models/user/roles.model';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
export class AuthController {
  static async register(req: Request, res: Response) {
    let status = 201;
    let result = 'Se ha creado el usuario satisfactoriamente';

    const userInterface: UserPayload = req.body;

    userInterface.password = await bcrypt.hash(userInterface.password, 10);

    try {
      await User.createUser(userInterface);
    } catch (e: any) {
      if (e.type === 'unique_email') {
        status = 406;
        result = 'El usuario ya se encuentra registrado';
      } else {
        console.log(e);

        status = 500;
        result = 'Hubo un error inesperado';
      }
    }

    res.status(status).json({ result });
  }

  static login(req: any, res: Response) {
    const user = { id: req.session.passport.user.id, role: req.session.passport.user.role };

    const token = JwtController.getSignedToken(user);
    const refreshToken = JwtController.createRefreshToken(req.session.passport.user.email);
    const usr = req.session.passport.user;
    usr.role = getRoleName(usr.role);

    res.status(200).json({ result: 'Authentication succesfull', token, refreshToken, user: usr });
  }

  static logout(req: Request, res: Response) {
    req.logOut();

    res.status(200).json({ result: 'Sign out succesfull' });
  }

  static passportCallback(req: any, res: any, other: any) {
    console.log(req);
    console.log(res);
    console.log(other);
  }

  static async forgetPassword(req: Request, res: Response) {
    const result = await User.searchUserByEmail(req.body.email);

    if (result.rows.length > 0) {
      AuthController.sendRecoverEmail(User.fromDB(result.rows[0]).email);
      res.status(200).json({ result: 'Correo de recuperación enviado exitosamente' });
    } else {
      res.status(406).json({ result: 'Correo no encontrado' });
    }
  }

  static sendRecoverEmail(email: string) {
    const API_KEY = process.env.MAILGUN_API_KEY;
    const DOMAIN = process.env.MAILGUN_DOMAIN;

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: 'api', key: API_KEY! });

    const messageData = {
      from: 'test@' + DOMAIN,
      to: email,
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!'
    };

    client.messages
      .create(DOMAIN!, messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
