import { User, UserPayload } from '../../models/user/user.model';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

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

      try {
        const data = await User.searchUserByEmail(email);

        if (data.rows.length > 0) {
          result = 'Usuario encontrado';
          parsed = User.fromDB(data.rows[0]).toJson();
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

  static async getIdByJwt(req: Request, res: Response) {
    let status = 200;
    let result = 'success';
    let user = {};

    if (req.headers['x-access-token'] === undefined) {
      status = 406;
      result = 'La cabecera x-access-token no fue encontrada';
    } else {
      const token = req.headers['x-access-token'];
      try {
        const decoded = jwt.verify(token.toString(), process.env.JWT_SECRET || 'TEMP_SECRET') as jwt.JwtPayload;

        const tmpuser = await User.searchUserById(decoded.id);

        if (tmpuser.rows.length <= 0) {
          status = 404;
          result = 'Tu usuario no ha sido encontrado';
        } else {
          user = User.fromDB(tmpuser.rows[0]).toJson();
        }
      } catch (e: any) {
        if (e.message === 'jwt expired') {
          result = 'Token expirado';
        } else {
          result = 'No esta autorizado';
        }

        status = 401;
      }
    }

    res.status(status).json({ result, user });
  }

  static async getAllUsers(_: Request, res: Response) {
    let status = 200;
    let result = 'success';
    const users: any = [];

    try {
      const data = await User.retrieveAllUsers();

      data.rows.forEach((e) => users.push(User.fromDB(e).toJson()));
    } catch (e: any) {
      if (e.type === 'database_eror') {
        result = 'Error de base de datos';
      } else {
        result = 'Error desconocido';
      }

      status = 501;
    }

    res.status(status).json({ result, status, users });
  }

  static async updateUser(req: Request, res: Response) {
    let status = 200;
    let result: any = 'success';
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      result = errors.array();
      status = 402;
    } else {
      const payload = req.body as UserPayload;
      try {
        await User.updateUSer(payload, req.body.id);
      } catch (e: any) {
        if (e.type === 'database_eror') {
          result = 'Error de base de datos';
          status = 501;
        } else if (e.type === 'duplicated_email') {
          result = 'Email ya registrado';
          status = 402;
        } else {
          result = 'Error desconocido';
          status = 501;
        }
      }
    }
    res.status(status).json({ result });
  }
}
