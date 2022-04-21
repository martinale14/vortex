import { Request, Response } from 'express';
import { Company, CompanyPayload } from '../../models/company/company.model';

export class CompanyController {
  static async getAllCompanies(_req: Request, res: Response) {
    let status = 200;
    let result = 'Compañias traidas exitosamente';
    let companies = {};

    try {
      const data = await Company.getAllCompanies();

      companies = data.rows.map((company) => Company.fromDB(company).toJson());
    } catch (_) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result, companies });
  }

  static async createCompany(req: Request, res: Response) {
    let status = 200;
    let result = 'Compañia creada exitosamente';

    const payload = req.body as CompanyPayload;

    try {
      await Company.createCompany(payload);
    } catch (e) {
      status = 500;
      result = 'Hubo un error inesperado';
    }

    res.status(status).json({ result });
  }
}
