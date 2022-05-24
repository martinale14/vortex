import pool from '../../database';
import { VortexException } from '../exceptions/exception.model';

export interface HistoryPayload {
  status: string;
  isEpic: boolean;
  createdBy: number;
  projectId: number;
  userResponsableId: number;
  epicParentId: number;
  sprintId: string;
}

export class History {
  id: string;
  status: string;
  isEpic: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  projectId: number;
  userResponsableId: number;
  epicParentId: number;
  sprintId: number;

  constructor(
    id: string,
    status: string,
    isEpic: boolean,
    createdAt: string,
    updatedAt: string,
    createdBy: string,
    updatedBy: string,
    projectId: number,
    userResponsableId: number,
    epicParentId: number,
    sprintId: number
  ) {
    this.id = id;
    this.status = status;
    this.isEpic = isEpic;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.projectId = projectId;
    this.userResponsableId = userResponsableId;
    this.epicParentId = epicParentId;
    this.sprintId = sprintId;
  }

  static fromDB(object: { [key: string]: any }): History {
    const history: History = new History(
      object.id_hist,
      object.status_hist,
      object.is_epic_hist,
      object.created_at_hist,
      object.updated_at_hist,
      object.created_by_hist,
      object.updated_by_hist,
      object.project_id_hist,
      object.user_responsable_id_hist,
      object.epic_parent_id_hist,
      object.sprint_id_hist
    );

    return history;
  }

  toJson(): object {
    const histJson: object = {
      id: this.id,
      status: this.status,
      isEpic: this.isEpic,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      projectId: this.projectId,
      userResponsableId: this.userResponsableId,
      epicParentId: this.epicParentId,
      sprintId: this.sprintId
    };

    return histJson;
  }

  static async createHistory(payload: HistoryPayload) {
    return await pool.query('SELECT * FROM vortex.create_history($1, $2, $3, $4, $5, $6, $7) as id_history', [
      payload.status,
      payload.isEpic,
      payload.createdBy,
      payload.projectId,
      payload.userResponsableId,
      payload.epicParentId,
      payload.sprintId
    ]);
  }

  static async getHistoriesByProject(idProject: string) {
    try {
      const histories = await pool.query('SELECT * FROM vortex.select_history_by_project($1)', [idProject]);

      return histories;
    } catch (e) {
      throw new VortexException('database_error');
    }
  }

  static async getHistoriesBySprint(idSprint: string) {
    try {
      const histories = await pool.query('SELECT * FROM vortex.select_history_by_sprint($1)', [idSprint]);

      return histories;
    } catch (e) {
      throw new VortexException('database_error');
    }
  }

  static async getLineBase(idSprint: string) {
    try {
      const histories = await pool.query('SELECT * FROM vortex.select_history_by_sprint($1)', [idSprint]);

      return histories;
    } catch (e) {
      throw new VortexException('database_error');
    }
  }
}
