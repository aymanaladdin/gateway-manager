import express from 'express';
import { CREATED, INTERNAL_SERVER_ERROR } from 'http-status';
import deviceService from '../services/device.service';

const deviceController = {
  async addPeripheralDevice(req: express.Request, res: express.Response) {
    try {
      const device = req.body;
      const serial = req.params.serial as string;

      const createdDevice = await deviceService.addDeviceToGateway(serial, device);
      res.status(CREATED).json(createdDevice);
    }
    catch (err: any) {
      if (err.status) {
        return res.status(err.status).json({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' })
    }
  },

  async removePeripheralDevice(req: express.Request, res: express.Response) {
    try {
      const deviceId = req.params.uid as string;
      const serial = req.params.serial as string;

      await deviceService.removeDeviceFromGateway(serial, deviceId);

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

export default deviceController;
