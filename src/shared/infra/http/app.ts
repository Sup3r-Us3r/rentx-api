import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/container';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import rateLimiter from './middlewares/rateLimiter';
import { routes } from './routes';

class App {
  public server = express();

  constructor() {
    createConnection();

    this.middlewares();
  }

  sentry() {
    Sentry.init({
      dsn: process.env.SENTRY_DNS,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: this.server }),
      ],
      tracesSampleRate: 1.0,
    });
  }

  middlewares() {
    this.server.use(rateLimiter);
    this.sentry();
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(Sentry.Handlers.tracingHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    this.server.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
    this.server.use('/cars', express.static(`${upload.tmpFolder}/cars`));
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
    this.server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        status: 'error',
        message: `Internal server error - ${error.message}`,
      });
    });
  }
}

export default new App().server;
