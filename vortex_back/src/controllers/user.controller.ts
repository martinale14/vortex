import { User } from '../models/user.model';
import { Request, Response } from 'express';

export class UserController {
  static async searchUser(req: Request, res: Response) {
    let status = 200;
    let result = '';
    let parsed = {};

    if (req.body.email === undefined) {
      status = 406;
      result = 'El parametro email no fue encontrado';
    } else {
      const email = req.body.email;

      const data = await User.searchUserByEmail(email);

      try {
        if (data.rows.length > 0) {
          result = 'Usuario encontrado';
          parsed = User.fromJson(data.rows[0]).toJson();
        } else {
          status = 404;
          result = 'Usuario no encontrado';
        }
      } catch (e: any) {
        status = 500;
        if (e.type === 'database_error') {
          result = 'Hubo un error con la base de datos';
        } else {
          result = 'Hubo un error inesperado';
        }
      }
    }

    res.status(status).json({ ...parsed, result });
  }
}
