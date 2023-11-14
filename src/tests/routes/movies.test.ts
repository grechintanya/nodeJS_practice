import { describe, test } from '@jest/globals';
import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';

import movieRouter from '../../routes/movies';

jest.mock('../../controllers/moviesControllers');
import * as controllers from '../../controllers/moviesControllers';

jest.mock('../../middleware/requestValidator', () => {
  return jest.fn((validations) => (req: Request, res: Response, next: NextFunction) => next());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Movies routes', () => {
  const app = express();
  app.use('/', movieRouter);

  test('endpoint "/" with get method should call getAllMovies controller', async () => {
    (controllers.getAllMovies as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).get('/');
    expect(controllers.getAllMovies as jest.Mock).toHaveBeenCalled();
  });

  test('endpoint "/genre/:genreName" with get method should call getMoviesByGenre controller', async () => {
    (controllers.getMoviesByGenre as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).get('/genre/:genreName');
    expect(controllers.getMoviesByGenre as jest.Mock).toHaveBeenCalled();
  });

  test('endpoint "/" with post method should call createMovie controller', async () => {
    (controllers.createMovie as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).post('/');
    expect(controllers.createMovie as jest.Mock).toHaveBeenCalled();
  });

  test('endpoint "/:id" with patch method should call updateMovie controller', async () => {
    (controllers.updateMovie as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).patch('/:id');
    expect(controllers.updateMovie as jest.Mock).toHaveBeenCalled();
  });

  test('endpoint "/:id" with delete method should call deleteMovie controller', async () => {
    (controllers.deleteMovie as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).delete('/:id');
    expect(controllers.deleteMovie as jest.Mock).toHaveBeenCalled();
  });
});
