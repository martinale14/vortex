import passport from 'passport';
import { Request, Response } from 'express';

export const authenticate = (req: Request, res: Response, next: any) => {
  const status = 401;
  const result = 'Usuario o contraseña incorrectos';
  passport.authenticate('local', function (err, user) {
    if (user !== null && err === null) {
      req.logIn(user, function (err) {
        if (err) {
          res.status(status).json({ result });
        } else {
          next();
        }
      });
    } else {
      res.status(status).json({ result });
    }
  })(req, res, next);
};
