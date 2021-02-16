import { Router } from 'express';
import formulasRoutes from './formulas.routes';
import resolverRoutes from './resolver.routes';

const routes = Router();

routes.use('/resolver', resolverRoutes);
routes.use('/formulas', formulasRoutes);

export default routes;
