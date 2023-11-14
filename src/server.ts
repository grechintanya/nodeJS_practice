import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDB from './config/DBconnect';
import swaggerSpec from './swaggerSpec';

import healthCheckRouter from './routes/healthCheck';
import genresRouter from './routes/genres';
import moviesRouter from './routes/movies';
import { errorHandler } from './middleware/errorHandlers';

dotenv.config();
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

app.use(errorHandler);

app.get('/*', (req: Request, res: Response) => {
  res.sendStatus(404);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
