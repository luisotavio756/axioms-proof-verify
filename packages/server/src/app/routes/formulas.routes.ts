import { Router } from 'express';
import FormulasController from '../controllers/FormulasController';

const formulasRoutes = Router();
const formulasController = new FormulasController();

formulasRoutes.get('/clear', formulasController.destroy);

export default formulasRoutes;
