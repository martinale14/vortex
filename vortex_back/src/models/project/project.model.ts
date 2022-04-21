import pool from '../../database';
import { VortexException } from '../exceptions/exception.model';

export interface ProjectPayload {
  name: string;
  estimatedTime: number;
  startDate: Date;
  createdBy: number;
  companyId: number;
}

export class Project {
  id: string;
  name: string;
  estimatedTime: number;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
  companyId: number;

  constructor(
    id: string,
    name: string,
    estimatedTime: number,
    startDate: Date,
    createdAt: Date,
    updatedAt: Date,
    createdBy: number,
    updatedBy: number,
    companyId: number
  ) {
    this.id = id;
    this.name = name;
    this.estimatedTime = estimatedTime;
    this.startDate = startDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.companyId = companyId;
  }

  static fromDB(object: { [key: string]: any }): Project {
    const project: Project = new Project(
      object.id_proj,
      object.name_proj,
      object.estimated_time_proj,
      object.start_date_proj,
      object.created_at_proj,
      object.updated_at_proj,
      object.created_by_proj,
      object.updated_by_proj,
      object.company_id_proj
    );

    return project;
  }

  toJson(): object {
    const projJson: object = {
      id: this.id,
      name: this.name,
      estimatedTime: this.estimatedTime,
      startDate: this.startDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      companyId: this.companyId
    };

    return projJson;
  }

  static async createProject(payload: ProjectPayload) {
    await pool.query('CALL vortex.insert_project($1, $2, $3, $4, $5)', [
      payload.name,
      payload.estimatedTime,
      payload.startDate,
      payload.createdBy,
      payload.companyId
    ]);
  }

  static async getProjectsByCompany(idCompany: string) {
    try {
      const projects = await pool.query('SELECT * FROM vortex.select_project_by_company($1)', [idCompany]);

      return projects;
    } catch (_) {
      throw new VortexException('database_error');
    }
  }
}
