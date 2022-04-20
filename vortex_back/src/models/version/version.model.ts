import pool from '../../database';

export interface VersionPayload {
  number: number;
  title: string;
  description: string;
  isBaseDoc: boolean;
  createdBy: number;
  historyId: number;
}

export class Version {
  id: string;
  number: number;
  title: string;
  description: string;
  isBaseDoc: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  historyId: number;

  constructor(
    id: string,
    number: number,
    title: string,
    description: string,
    isBaseDoc: boolean,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    updatedBy: string,
    historyId: number
  ) {
    this.id = id;
    this.number = number;
    this.title = title;
    this.description = description;
    this.isBaseDoc = isBaseDoc;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.historyId = historyId;
  }

  static fromDB(object: { [key: string]: any }): Version {
    const version: Version = new Version(
      object.id_vers,
      object.number_vers,
      object.title_vers,
      object.description_vers,
      object.is_base_doc_vers,
      object.created_at_vers,
      object.updated_at_vers,
      object.created_by_vers,
      object.updated_by_vers,
      object.history_id_vers
    );

    return version;
  }

  toJson(): object {
    const versJson: object = {
      id: this.id,
      number: this.number,
      title: this.title,
      description: this.description,
      isBaseDoc: this.isBaseDoc,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      historyId: this.historyId
    };

    return versJson;
  }

  static async createVersion(payload: VersionPayload) {
    await pool.query('CALL vortex.insert_version($1, $2, $3, $4, $5, $6)', [
      payload.number,
      payload.title,
      payload.description,
      payload.isBaseDoc,
      payload.createdBy,
      payload.historyId
    ]);
  }
}
