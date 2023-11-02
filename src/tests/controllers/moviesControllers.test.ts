import { describe, test } from '@jest/globals';
import { Request, Response } from 'express';
const mockingoose = require('mockingoose');

import { FakeExpress } from './fakeExpress';
import * as moviesControllers from '../../controllers/moviesControllers';
import { Genre, Movie, MovieObj } from '../../models';

describe('Movie Controllers', () => {
  let fakeExpress: FakeExpress;

  describe('getAllMovies', () => {
    const listOfMovies: MovieObj[] = [
      {
        _id: '100a43821479c3ea68d63286',
        title: 'Movie 1',
        description: 'Description of movie1',
        releaseDate: new Date('2022/05/23').toISOString(),
        genres: ['653a43821479c3ea68d63286'],
      },
      {
        _id: '100a43821479c3ea68d63287',
        title: 'Movie 2',
        description: 'Description of movie2',
        releaseDate: new Date('2012/10/10').toISOString(),
        genres: ['653a43821479c3ea68d63286', '653a43821479c3ea68d63287'],
      },
      {
        _id: '100a43821479c3ea68d63288',
        title: 'Movie 3',
        description: 'Description of movie3',
        releaseDate: new Date('2015/08/12').toISOString(),
        genres: ['653a43821479c3ea68d63286'],
      },
    ];
    test('should send array of movies', async () => {
      fakeExpress = new FakeExpress({} as Partial<Request>);
      mockingoose(Movie).toReturn(listOfMovies, 'find');
      await moviesControllers.getAllMovies(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(JSON.parse(JSON.stringify(fakeExpress.responseData))).toMatchObject(listOfMovies);
    });

    test('should send status 204, if there is no movies in database', async () => {
      mockingoose(Movie).toReturn([], 'find');
      await moviesControllers.getAllMovies(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(204);
    });
  });

  describe('createMovie', () => {
    test('if request is valid, should send status code 201 and movie object', async () => {
      const newMovie: MovieObj = {
        title: 'A new Movie',
        description: 'Description ...',
        releaseDate: new Date('2018/11/10').toISOString(),
        genres: ['653a43821479c3ea68d63286', '653a43821479c3ea68d63287'],
      };
      const req: Partial<Request> = {
        body: newMovie,
      };
      fakeExpress = new FakeExpress(req);
      mockingoose(Movie).toReturn(newMovie, 'create');
      await moviesControllers.createMovie(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(201);
      expect(JSON.parse(JSON.stringify(fakeExpress.responseData.movie))).toMatchObject(newMovie);
    });
  });

  describe('updateMovie', () => {
    const updatedMovie: MovieObj = {
      _id: '100a43821479c3ea68d63289',
      title: 'A new Movie',
      description: 'Description ...',
      releaseDate: new Date('2018/11/10').toISOString(),
      genres: ['653a43821479c3ea68d63286', '653a43821479c3ea68d63287'],
    };
    const req: Partial<Request> = {
      body: updatedMovie,
      params: {
        id: updatedMovie._id as string,
      },
    };

    test('if request is valid, should send status code 200 and success message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Movie).toReturn({ matchedCount: 1 }, 'updateOne');
      await moviesControllers.updateMovie(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(200);
      expect(fakeExpress.responseData.message).toBe(`Movie with id ${updatedMovie._id} was updated`);
    });

    test('if movie not found in DB, should send status code 404 and error message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Movie).toReturn({ matchedCount: 0 }, 'updateOne');
      await moviesControllers.updateMovie(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(404);
      expect(fakeExpress.responseData.message).toBe(`Movie not found`);
    });
  });

  describe('deleteMovie', () => {
    const movieID = '100a43821479c3ea68d63290';
    const req: Partial<Request> = {
      params: {
        id: movieID,
      },
    };
    test('if request is valid, should send status code 200 and success message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Movie).toReturn({ deletedCount: 1 }, 'deleteOne');
      await moviesControllers.deleteMovie(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(200);
      expect(fakeExpress.responseData.message).toBe(`Movie with id ${movieID} was deleted`);
    });

    test('if movie not found in DB, should send status code 404 and error message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Movie).toReturn({ deletedCount: 0 }, 'deleteOne');
      await moviesControllers.deleteMovie(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(404);
      expect(fakeExpress.responseData.message).toBe(`Movie not found`);
    });
  });

  describe('getMoviesByGenre', () => {
    const req: Partial<Request> = {
      params: {
        genreName: 'action',
      },
    };
    const moviesArray = [
      {
        _id: '100a43821479c3ea68d63286',
        title: 'Movie 1',
        description: 'Description of movie1',
        releaseDate: new Date('2022/05/23').toISOString(),
        genres: ['100a43821479c3ea68d63290'],
      },
      {
        _id: '100a43821479c3ea68d63287',
        title: 'Movie 2',
        description: 'Description of movie2',
        releaseDate: new Date('2012/10/10').toISOString(),
        genres: ['100a43821479c3ea68d63290', '653a43821479c3ea68d63287'],
      },
    ];
    test('if request valid, should send status code 200 and list of movies', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn({ _id: '100a43821479c3ea68d63290', name: 'action' }, 'findOne');
      mockingoose(Movie).toReturn(moviesArray, 'find');
      await moviesControllers.getMoviesByGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(200);
      expect(JSON.parse(JSON.stringify(fakeExpress.responseData))).toMatchObject(moviesArray);
    });

    test('if request invalid, should send status code 400 and error message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn(null, 'findOne');
      await moviesControllers.getMoviesByGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(400);
      expect(fakeExpress.responseData?.message).toEqual('Invalid genre');
    });

    test('if request valid, but movies not found in DB, should send status code 204', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn({ _id: '100a43821479c3ea68d63290', name: 'action' }, 'findOne');
      mockingoose(Movie).toReturn([], 'find');
      await moviesControllers.getMoviesByGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(204);
    });
  });
});
