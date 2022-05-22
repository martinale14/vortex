import { Role, getRoleName } from './roles.model';
import pool from '../../database';
import { VortexException } from '../exceptions/exception.model';

export interface UserPayload {
  name: string;
  phone: string;
  email: string;
  role: Role;
  pictureUrl: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  phone: string;
  email: string;
  forgotPassword: boolean;
  acceptedTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  pictureUrl: string;
  password: string;

  constructor(
    id: string,
    name: string,
    phone: string,
    email: string,
    forgotPassword: boolean,
    acceptedTerms: boolean,
    createdAt: Date,
    updatedAt: Date,
    role: Role,
    pictureUrl: string,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.forgotPassword = forgotPassword;
    this.acceptedTerms = acceptedTerms;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
    this.pictureUrl = pictureUrl;
    this.password = password;
  }

  static fromDB(object: { [key: string]: any }): User {
    const user: User = new User(
      object.id_user,
      object.name_user,
      object.phone_user,
      object.email_user,
      object.forgot_password_user,
      object.accepted_terms_user,
      object.created_at_user,
      object.updated_at_user,
      object.role_id_user,
      object.picture_url_user,
      object.password_user
    );

    return user;
  }

  toJson(): object {
    const userJson: object = {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      forgotPassword: this.forgotPassword,
      acceptedTerms: this.acceptedTerms,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      pictureUrl: this.pictureUrl,
      role: getRoleName(this.role)
    };

    return userJson;
  }

  static async createUser(payload: UserPayload) {
    try {
      await pool.query('CALL vortex.insert_user($1, $2, $3, $4, $5, $6)', [
        payload.name,
        payload.phone,
        payload.email,
        payload.password,
        payload.pictureUrl,
        payload.role
      ]);
    } catch (e: any) {
      if (e.constraint === 'unique_email') {
        throw new VortexException(e.constraint);
      } else {
        throw e;
      }
    }
  }

  static async searchUserByEmail(email: string) {
    try {
      const data = await pool.query('SELECT * FROM vortex.users WHERE email_user = $1', [email]);

      return data;
    } catch (_) {
      throw new VortexException('database_error');
    }
  }

  static async searchUserById(id: string) {
    try {
      const data = await pool.query('SELECT * FROM vortex.users WHERE id_user = $1', [id]);

      return data;
    } catch (_) {
      throw new VortexException('database_error');
    }
  }

  static async retrieveAllUsers() {
    try {
      const data = await pool.query('SELECT * FROM vortex.users');

      return data;
    } catch (_) {
      throw new VortexException('database_eror');
    }
  }

  static async updateUSer(payload: UserPayload, id: string) {
    try {
      await pool.query('CALL vortex.update_user ($1, $2, $3, $4)', [payload.name, payload.phone, payload.email, id]);
    } catch (e: any) {
      if (e.constraint === 'unique_email') {
        throw new VortexException('duplicated_email');
      }

      throw new VortexException('database_eror');
    }
  }
}
