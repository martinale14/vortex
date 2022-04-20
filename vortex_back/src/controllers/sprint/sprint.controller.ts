import { Response, Request } from 'express';
import { Sprint, SprintPayload } from '../../models/sprint/sprint.model';

export class SprintController {
  static async createSprint(req: Request, res: Response) {
    let status = 200;
    let result = 'Sprint creada exitosamente';

    const payload = req.body as SprintPayload;

    try {
      await Sprint.createSprint(payload);
    } catch (e) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result });
  }
}
