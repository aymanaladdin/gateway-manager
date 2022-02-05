import express from 'express';
import { CREATED, NOT_FOUND, OK } from 'http-status';
import { Gateway } from './types';

const gateways: Gateway[] = [
  {
    serialNumber: 'LcLNhgSA',
    displayName: 'gateway one',
    ipAddress: '123.432.213.44',
    peripheralDevices: ['dev 1', 'dev2'],
  },
  {
    serialNumber: 'LcLNhgSA',
    displayName: 'gateway two',
    ipAddress: '123.432.413.44',
    peripheralDevices: ['dev 1', 'dev2'],
  },
  {
    serialNumber: 'LcLNhgSA',
    displayName: 'gateway three',
    ipAddress: '123.432.213.41',
    peripheralDevices: ['dev 1', 'dev2'],
  },
];

const gatewayController = {
  async listGateways(req: express.Request, res: express.Response) {
    res
      .status(OK)
      .json(
        gateways
          .map(
            ({ serialNumber, displayName, ipAddress }) => (
              { serialNumber, displayName, ipAddress }
            ),
          ),
      );
  },

  async addGateway(req: express.Request, res: express.Response) {
    gateways.push(req.body as Gateway);

    res.status(CREATED).end();
  },

  async getGatewayDetails(req: express.Request, res: express.Response) {
    const serialNumber = req.params.serialNumber as string;
    const foundGateway = gateways.find((gateway) => gateway.serialNumber === serialNumber);

    if (!foundGateway) res.status(NOT_FOUND).json({ message: `Gateway ${serialNumber} not found!` });

    else res.status(OK).json(foundGateway);
  },

};

export default gatewayController;
