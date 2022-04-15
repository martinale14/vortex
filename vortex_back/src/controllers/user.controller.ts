import { User, UserInterface } from '../models/user.model';
import pool from '../database';

export class UserController {
  static async insertNewUser(userInterface: UserInterface): Promise<{ [key: string]: any }> {
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
        return { result: 'El usuario ya se encuentra registrado', status: 300 };
      } else {
        console.log(e);
      }
    }

    return { result: 'El usuario se registro exitosamente', status: 200 };
  }

  static async getUserByEmail(email: string): Promise<{ [key: string]: any }> {
    try {
      const result = await pool.query('SELECT * FROM vortex.find_user_by_email($1)', [email]);

      if (result.rows.length > 0) {
        return { user: User.fromJson(result.rows[0]) };
      }
    } catch (e) {
      console.log(e);
    }

    return { result: 'El usuario no fue encontrado', status: 400 };
  }
}
