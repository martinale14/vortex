import { Request, Response } from 'express';
import { AcceptanceCriteria, AcceptanceCriteriaPayload } from '../../models/acceptance_citeria/acc.model';
import { History, HistoryPayload } from '../../models/history/history.model';
import { Version, VersionPayload } from '../../models/version/version.model';

export class HistoryController {
  static async createHistory(req: Request, res: Response) {
    let status = 200;
    let result = 'Historia de usuario creada exitosamente';
    let idHistory: number = 0;

    const historyPayload = req.body.history as HistoryPayload;
    const versionPayload = req.body.version as VersionPayload;
    const acceptanceCriteriaPayloads = req.body.acc as [AcceptanceCriteriaPayload];

    try {
      const data = await History.createHistory(historyPayload);

      idHistory = data.rows[0].id_history;

      versionPayload.historyId = idHistory;

      await Version.createVersion(versionPayload);

      acceptanceCriteriaPayloads.forEach(async (acceptanceCriteriaPayload) => {
        acceptanceCriteriaPayload.historyId = idHistory;
        await AcceptanceCriteria.createAcceptanceCriteria(acceptanceCriteriaPayload);
      });
    } catch (e) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result });
  }
}
