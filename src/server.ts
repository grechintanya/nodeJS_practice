import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import healthCheckRouter from './routes/healthCheck';

const app = express();
const port: Number = 3000;

import swaggerDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS Practice',
      version: '1.0.0',
    },
  },
  apis: [`${path.join(__dirname, 'routes')}/*.ts`, 'server.ts'],
};

const swaggerSpec = swaggerDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.use('/health-check', healthCheckRouter);

app.get('/*', (req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
