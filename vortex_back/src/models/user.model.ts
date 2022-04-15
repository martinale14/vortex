import { Role, getRoleName } from './roles.model';

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

  constructor(
    id: string,
    name: string,
    phone: string | null,
    email: string,
    forgotPassword: boolean,
    acceptedTerms: boolean,
    createdAt: Date,
    updatedAt: Date,
    role: Role
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
  }

  static fromJson(obj: { [key: string]: any }): User {
    console.log(obj);

    const user: User = new User(
      obj.id_user,
      obj.name_user,
      obj.phone_user,
      obj.email_user,
      obj.forgot_password_user,
      obj.accepted_terms_user,
      obj.created_at_user,
      obj.updated_at_user,
      obj.role_id_user
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
}
