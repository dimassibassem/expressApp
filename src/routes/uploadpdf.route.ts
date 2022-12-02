import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import PdfController from '@controllers/pdf.controller';

class PdfRoute implements Routes {
  public path = '/';
  public router = Router();
  public pdfController = new PdfController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}uploadPdf`, this.pdfController.index);
  }
}

export default PdfRoute;
