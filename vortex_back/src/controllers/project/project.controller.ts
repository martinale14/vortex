import { Request, Response } from 'express';
import { Project, ProjectPayload } from '../../models/project/project.model';

export class ProjectController {
  static async createProject(req: Request, res: Response) {
    let status = 200;
    let result = 'Proyecto creado exitosamente';

    const payload = req.body as ProjectPayload;

    try {
      await Project.createProject(payload);
    } catch (e) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result });
  }
}
