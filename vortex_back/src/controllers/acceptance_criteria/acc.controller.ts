import { Request, Response } from 'express';
import { AcceptanceCriteria, AcceptanceCriteriaPayload } from '../../models/acceptance_citeria/acc.model';

export class AcceptanceCriteriaController {
  static async createAcceptanceCriteria(req: Request, res: Response) {
    let status = 200;
    let result = 'Criterio de acceptación creado exitosamente';

    const payload = req.body as AcceptanceCriteriaPayload;

    try {
      await AcceptanceCriteria.createAcceptanceCriteria(payload);
    } catch (e) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result });
  }
}
