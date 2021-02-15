import { Router } from 'express';
import ResolverController from '../controllers/ResolverController';

const resolverRoutes = Router();
const resolverController = new ResolverController();

resolverRoutes.post('/', resolverController.store);

export default resolverRoutes;
