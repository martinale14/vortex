import { Role, getRoleName } from './roles.model';
import pool from '../database';
import { VortexException } from './exception.model';

export interface UserInterface {
  name: string;
  phone: string | null;
  email: string;
  role: Role;
  password: string;
}

export class User {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  forgotPassword: boolean;
  acceptedTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  password: string;

  constructor(
    id: string,
    name: string,
    phone: string | null,
    email: string,
    forgotPassword: boolean,
    acceptedTerms: boolean,
    createdAt: Date,
    updatedAt: Date,
    role: Role,
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
    this.password = password;
  }

  static fromJson(obj: { [key: string]: any }): User {
    const user: User = new User(
      obj.id_user,
      obj.name_user,
      obj.phone_user,
      obj.email_user,
      obj.forgot_password_user,
      obj.accepted_terms_user,
      obj.created_at_user,
      obj.updated_at_user,
      obj.role_id_user,
      obj.password_user
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
      role: getRoleName(this.role)
    };

    return userJson;
  }

  static async createUser(userInterface: UserInterface) {
    try {
      await pool.query('CALL vortex.insert_user($1, $2, $3, $4, $5)', [
        userInterface.name,
        userInterface.phone,
        userInterface.email,
        userInterface.password,
        userInterface.role
      ]);
    } catch (e: any) {
      if (e.constraint === 'unique_email') {
        throw new VortexException(e.constrain);
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
}
