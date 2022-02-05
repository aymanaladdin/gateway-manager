import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';
import { NOT_FOUND } from 'http-status';

import { API_VERSION, LOG_OPTION } from './constants';
import appRoutes from './api/routes';

const app = express();

app.use(morgan(LOG_OPTION));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(helmet());

app.use(cors());
app.use(methodOverride());

// mount api v1 routes
app.use(API_VERSION, appRoutes);

// catch 404 and forward to error handler
app.all('*', (_, res) => {
  res.status(NOT_FOUND).send('<h1>404! Page not found</h1>');
});

// error handler, send stacktrace only during development
// app.use(error.handler);

export default app;
