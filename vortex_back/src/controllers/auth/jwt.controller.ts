import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user/user.model';

export class JwtController {
  static async generateTokenByRefreshToken(req: Request, res: Response) {
    let status = 200;
    let result = 'Token generado correctamente';
    let token = '';
    let newRefreshToken = '';

    if (req.body.refreshToken === undefined) {
      status = 404;
      result = 'Token de refrescamiento no encontrado';
    } else {
      try {
        const refreshToken = req.body.refreshToken;
        const decoded = jwt.verify(refreshToken.toString(), process.env.JWT_SECRET || 'TEMP_SECRET') as jwt.JwtPayload;

        const user = await User.searchUserByEmail(decoded.email);

        if (user.rows.length <= 0) {
          status = 404;
          result = 'Tu usuario no ha sido encontrado';
        } else {
          const usr = User.fromDB(user.rows[0]);
          newRefreshToken = JwtController.createRefreshToken(decoded.email);
          token = JwtController.getSignedToken({ id: usr.id, role: usr.role });
        }
      } catch (e: any) {
        if (e.message === 'jwt expired') {
          result = 'Acceso prohibído';
        } else {
          result = 'No esta autorizado';
        }

        status = 403;
      }
    }

    res.status(status).json({ result, token, newRefreshToken });
  }

  static getSignedToken(object: { id: string; role: number }) {
    const token = jwt.sign(object, process.env.JWT_SECRET || 'TEMP_SECRET', { expiresIn: 86400 });
    return token;
  }

  static createRefreshToken(email: string) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'TEMP_SECRET', { expiresIn: 604800 });
    return token;
  }

  static rejectToken(_: Request, res: Response) {
    const status = 200;
    const result = 'Token invalidado correctamente';

    res.status(status).send({ result });
  }
}
