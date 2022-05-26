import { Template } from '../../models/template/template.model';
import { Request, Response } from 'express';

class TemplateController {
  static addTemplate(req: Request, res: Response) {
    Template.createTemplate(req.body);

    res.status(200).json({ result: 'Plantilla añadida correctamente' });
  }

  static async getAllTemplates(_: Request, res: Response) {
    let result = (await Template.getAllTemplates()).rows;
    result = result.map((e) => Template.fromDB(e).toJson());
    res.status(200).json({ result });
  }
}

export default TemplateController;
