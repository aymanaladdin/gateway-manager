import { Router } from 'express';
import gateWayRoutes from './gateway/routes/gateway.routes';
import { GATEWAY_PATH } from '../util/constants';

const appRoutes = Router();

appRoutes.use(GATEWAY_PATH, gateWayRoutes);

export default appRoutes;
