import pool from '../../database';
import { VortexException } from '../exceptions/exception.model';

export interface AcceptanceCriteriaPayload {
  description: string;
  type: string;
  createdBy: number;
  historyId: number;
}

export class AcceptanceCriteria {
  id: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  historyId: number;

  constructor(
    id: string,
    description: string,
    type: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    updatedBy: string,
    historyId: number
  ) {
    this.id = id;
    this.description = description;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.historyId = historyId;
  }

  static fromDB(object: { [key: string]: any }): AcceptanceCriteria {
    const version: AcceptanceCriteria = new AcceptanceCriteria(
      object.id_acc,
      object.description_acc,
      object.type_acc,
      object.created_at_acc,
      object.updated_at_acc,
      object.created_by_acc,
      object.updated_by_acc,
      object.history_id_acc
    );

    return version;
  }

  toJson(): object {
    const accJson: object = {
      id: this.id,
      description: this.description,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      historyId: this.historyId
    };

    return accJson;
  }

  static async createAcceptanceCriteria(payload: AcceptanceCriteriaPayload) {
    await pool.query('CALL vortex.insert_acc_criteria($1, $2, $3, $4)', [
      payload.description,
      payload.type,
      payload.createdBy,
      payload.historyId
    ]);
  }

  static async getAccByHistory(idHistory: string) {
    try {
      const acc = await pool.query('SELECT * FROM vortex.select_acc_by_history($1)', [idHistory]);

      return acc;
    } catch (_) {
      throw new VortexException('database_error');
    }
  }
}
