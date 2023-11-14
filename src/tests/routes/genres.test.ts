import { describe, test } from '@jest/globals';
import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';

import genresRouter from '../../routes/genres';

jest.mock('../../controllers/genresControllers');
import * as controllers from '../../controllers/genresControllers';

jest.mock('../../middleware/requestValidator', () => {
  return jest.fn((validations) => (req: Request, res: Response, next: NextFunction) => next());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Genres routes', () => {
  const app = express();
  app.use('/', genresRouter);

  test('endpoint "/" with get method should call getAllGenres controller', async () => {
    (controllers.getAllGenres as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).get('/');
    expect(controllers.getAllGenres as jest.Mock).toHaveBeenCalled();
  });

  test('endpoint "/" with post method should call createGenre controller', async () => {
    (controllers.createGenre as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).post('/');
    expect(controllers.createGenre as jest.Mock).toHaveBeenCalled();
  });

  test('endpoint "/:id" with patch method should call updateGenre controller', async () => {
    (controllers.updateGenre as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).patch('/:id');
    expect(controllers.updateGenre as jest.Mock).toHaveBeenCalled();
  });

  test('endpoint "/:id" with delete method should call deleteGenre controller', async () => {
    (controllers.deleteGenre as jest.Mock).mockImplementation((res: Response) => res.end());
    await request(app).delete('/:id');
    expect(controllers.deleteGenre as jest.Mock).toHaveBeenCalled();
  });
});
