import pool from '../../database';
import { VortexException } from '../exceptions/exception.model';

export interface CompanyPayload {
  name: string;
  email: string;
  phone: string;
  direction: string;
  createdBy: number;
}

export class Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  direction: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    direction: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    updatedBy: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.direction = direction;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  static fromDB(object: { [key: string]: any }): Company {
    const company: Company = new Company(
      object.id_comp,
      object.name_comp,
      object.email_comp,
      object.phone_comp,
      object.direction_comp,
      object.created_at_comp,
      object.updated_at_comp,
      object.created_by_comp,
      object.updated_by_comp
    );

    return company;
  }

  toJson(): object {
    const compJson: object = {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      direction: this.direction,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    };

    return compJson;
  }

  static async createCompany(payload: CompanyPayload) {
    await pool.query('CALL vortex.insert_company($1, $2, $3, $4, $5)', [
      payload.name,
      payload.email,
      payload.phone,
      payload.direction,
      payload.createdBy
    ]);
  }

  static async getAllCompanies() {
    try {
      const companies = await pool.query('SELECT * FROM vortex."allCompanies"');

      return companies;
    } catch (_) {
      throw new VortexException('database_error');
    }
  }
}
