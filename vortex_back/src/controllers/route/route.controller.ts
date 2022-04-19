import { Request, Response } from 'express';

export class RouteController {
  static routeNotFound(_req: Request, res: Response) {
    res.status(404).json({ result: 'Ruta no encontrada' });
  }
}
