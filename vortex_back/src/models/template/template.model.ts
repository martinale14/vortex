import pool from '../../database';

export interface TemplatePayload {
  description: string;
  type: string;
}

export class Template {
  id: string;
  description: string;
  type: string;
  createdAt: Date;

  constructor(id: string, description: string, type: string, createdAt: Date) {
    this.id = id;
    this.description = description;
    this.type = type;
    this.createdAt = createdAt;
  }

  static fromDB(object: { [key: string]: any }): Template {
    const sprint: Template = new Template(
      object.id_temp,
      object.description_temp,
      object.type_temp,
      object.created_at_temp
    );

    return sprint;
  }

  toJson(): object {
    const spriJson: object = {
      id: this.id,
      type: this.type,
      description: this.description,
      createdAt: this.createdAt
    };

    return spriJson;
  }

  static async createTemplate(payload: TemplatePayload) {
    await pool.query('CALL vortex.insert_temp($1,$2)', [payload.description, payload.type]);
  }

  static async getAllTemplates() {
    return await pool.query('SELECT * FROM vortex.templates');
  }
}
