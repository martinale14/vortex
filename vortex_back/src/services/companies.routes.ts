import express from 'express';
import { CompanyController } from '../controllers/company/company.controller';

const router = express.Router();

router.get('/', CompanyController.getAllCompanies);

router.post('/', CompanyController.createCompany);

export default router;
