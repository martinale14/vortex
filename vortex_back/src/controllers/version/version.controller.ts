import { Request, Response } from 'express';
import { Version, VersionPayload } from '../../models/version/version.model';

export class VersionController {
  static async createVersion(req: Request, res: Response) {
    let status = 200;
    let result = 'Versión creada exitosamente';

    const payload = req.body as VersionPayload;

    try {
      await Version.createVersion(payload);
    } catch (e) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result });
  }

  static async getLastVersionByHistory(req: Request, res: Response) {
    let status = 200;
    let result = 'Version traida exitosamente';
    let version = {};

    const historyId = req.params.idHistory;

    try {
      const data = await Version.getLastVersionByHistory(historyId);

      version = Version.fromDB(data.rows[0]).toJson();
    } catch (_) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result, version });
  }
}
