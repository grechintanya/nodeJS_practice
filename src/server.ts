import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

import connectDB from './config/DBconnect';
import swaggerSpec from './swaggerSpec';

import healthCheckRouter from './routes/healthCheck';
import genresRouter from './routes/genres';
import moviesRouter from './routes/movies';

const app = express();
const port: String | Number = process.env.PORT || 3000;

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.use('/health-check', healthCheckRouter);

app.use('/genres', genresRouter);

app.use('/movies', moviesRouter);

app.get('/*', (req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
