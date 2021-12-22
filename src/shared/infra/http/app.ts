
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/container';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { routes } from './routes';

class App {
  public server = express();

  constructor() {
    createConnection();

    this.middlewares();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    this.server.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
    this.server.use('/cars', express.static(`${upload.tmpFolder}/cars`));
    this.server.use(routes);
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
