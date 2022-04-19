import { User, UserInterface } from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
  static async register(req: Request, res: Response) {
    let status = 201;
    let result = 'Se ha creado el usuario satisfactoriamente';

    const userInterface: UserInterface = req.body;

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
    const token = jwt.sign({ id: req.session.passport.user.id }, process.env.JWT_SECRET || 'TEMP_SECRET', {
      expiresIn: 365
    });

    res.status(200).json({ result: 'Authentication succesfull', token });
  }

  static logout(req: Request, res: Response) {
    req.logOut();

    res.status(200).json({ result: 'Sign out succesfull' });
  }
}
