import { User, UserPayload } from '../../models/user/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { JwtController } from './jwt.controller';

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

    res.status(200).json({ result: 'Authentication succesfull', token, refreshToken });
  }

  static logout(req: Request, res: Response) {
    req.logOut();

    res.status(200).json({ result: 'Sign out succesfull' });
  }
}
