import express from 'express';
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';
import gatewayService from '../services/gateway.service';

const gatewayController = {
  async listGateways(req: express.Request, res: express.Response) {
    try {
      const gateways = await gatewayService.listGateways();

      res.status(OK).json(gateways);
    }
    catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' })
    }
  },

  async addGateway(req: express.Request, res: express.Response) {
    try {
      const createdGateway = await gatewayService.createGateway(req.body);

      res.status(CREATED).json(createdGateway);
    }
    catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' })
    }
  },

  async getGatewayDetails(req: express.Request, res: express.Response) {
    try {
      const serial = req.params.serial as string;

      const foundGateway = await gatewayService.getGatewayDetails(serial);

      if (!foundGateway) res.status(NOT_FOUND).json({ message: `Gateway ${serial} not found!` });

      else res.status(OK).json(foundGateway);
    }
    catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' })
    }
  },

  async removeGateway(req: express.Request, res: express.Response) {
    try {
      const serial = req.params.serial as string;

      await gatewayService.removeGateway(serial);

      res.status(CREATED).end();
    }
    catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' })
    }
  },

};

export default gatewayController;
