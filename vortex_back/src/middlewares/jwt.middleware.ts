import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user/user.model';

export const verifyJWT = async (req: Request, res: Response, next: any) => {
  let status = 200;
  let result = 'succes';
  const token = req.headers['x-access-token'];

  if (token === undefined || token === null) {
    status = 403;
    result = 'Token no encontrado';
  } else {
    try {
      const decoded = jwt.verify(token.toString(), process.env.JWT_SECRET || 'TEMP_SECRET') as jwt.JwtPayload;      

      const user = await User.searchUserById(decoded.id);

      if (user.rows.length <= 0) {
        status = 404;
        result = 'Tu usuario no ha sido encontrado';
      }
    } catch (e) {
      status = 401;
      result = 'No esta autorizado';
    }
  }

  if (status !== 200) {
    res.status(status).json({ result });
  } else {
    next();
  }
};
