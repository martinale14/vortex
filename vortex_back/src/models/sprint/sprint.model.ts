import pool from '../../database';

export interface SprintPayload {
  startDate: Date;
  endDate: Date;
  status: string;
  createdBy: number;
  projectId: number;
}

export class Sprint {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  projectId: number;

  constructor(
    id: string,
    startDate: Date,
    endDate: Date,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    updatedBy: string,
    projectId: number
  ) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.projectId = projectId;
  }

  static fromDB(object: { [key: string]: any }): Sprint {
    const sprint: Sprint = new Sprint(
      object.id_spri,
      object.start_date_spri,
      object.end_date_spri,
      object.status_spri,
      object.created_at_spri,
      object.updated_at_spri,
      object.created_by_spri,
      object.updated_by_spri,
      object.project_id_spri
    );

    return sprint;
  }

  toJson(): object {
    const spriJson: object = {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      projectId: this.projectId
    };

    return spriJson;
  }

  static async createSprint(payload: SprintPayload) {
    await pool.query('CALL vortex.insert_sprint($1, $2, $3, $4, $5)', [
      payload.startDate,
      payload.endDate,
      payload.status,
      payload.createdBy,
      payload.projectId
    ]);
  }
}
