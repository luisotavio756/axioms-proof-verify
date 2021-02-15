import { Router } from 'express';
import resolverRoutes from './resolver.routes';

const routes = Router();

routes.use('/resolver', resolverRoutes);

export default routes;