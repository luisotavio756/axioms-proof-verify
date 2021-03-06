import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import routes from '@app/routes';

import '@shared/container/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: err.message,
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server is running on port 3333!');
});
