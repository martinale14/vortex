import { User, UserInterface } from '../models/user.model';
import { Request, Response } from 'express';

export class AuthController {
  static async register(req: Request, res: Response) {
    let status = 201;
    let result = 'Se ha creado el usuario satisfactoriamente';

    const userInterface: UserInterface = req.body;

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
}
