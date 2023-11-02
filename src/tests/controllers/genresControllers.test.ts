import { describe, test } from '@jest/globals';
import { Request, Response } from 'express';
const mockingoose = require('mockingoose');

import { FakeExpress } from './fakeExpress';
import * as genresControllers from '../../controllers/genresControllers';
import { Genre, GenreObj } from '../../models';

let fakeExpress: FakeExpress;

describe('Genre Controllers', () => {
  describe('getAllGenres Controller', () => {
    const listOfGenres: GenreObj[] = [
      {
        _id: '653a43821479c3ea68d63286',
        name: 'drama',
      },
      {
        _id: '653a43821479c3ea68d63287',
        name: 'action',
      },
      {
        _id: '653a43821479c3ea68d63288',
        name: 'criminal',
      },
    ];

    test('should send status 200 and an array of genres', async () => {
      fakeExpress = new FakeExpress({} as Partial<Request>);
      mockingoose(Genre).toReturn(listOfGenres, 'find');
      await genresControllers.getAllGenres(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(200);
      expect(JSON.parse(JSON.stringify(fakeExpress.responseData))).toMatchObject(listOfGenres);
    });

    test('should send status 204, if there is no genres in database', async () => {
      mockingoose(Genre).toReturn([], 'find');
      await genresControllers.getAllGenres(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(204);
    });
  });

  describe('createGenre', () => {
    test('if request is valid, should send status code 201 and genre object', async () => {
      const newGenre: GenreObj = {
        name: 'comedy',
      };
      const req: Partial<Request> = {
        body: newGenre,
      };
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn(newGenre, 'create');
      await genresControllers.createGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(201);
      expect(fakeExpress.responseData.genre.name).toBe('comedy');
    });
  });

  describe('updateGenre', () => {
    const updatedGenre: GenreObj = {
      _id: '653a43821479c3ea68d63289',
      name: 'thriller',
    };
    const req: Partial<Request> = {
      body: updatedGenre,
      params: {
        id: updatedGenre._id as string,
      },
    };

    test('if request is valid, should send status code 200 and success message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn({ matchedCount: 1 }, 'updateOne');
      await genresControllers.updateGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(200);
      expect(fakeExpress.responseData.message).toBe(`Genre with id ${updatedGenre._id} was updated`);
    });

    test('if genre not found in DB, should send status code 404 and error message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn({ matchedCount: 0 }, 'updateOne');
      await genresControllers.updateGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(404);
      expect(fakeExpress.responseData.message).toBe(`Genre not found`);
    });
  });

  describe('deleteGenre', () => {
    const genreID = '653a43821479c3ea68d63290';
    const req: Partial<Request> = {
      params: {
        id: genreID,
      },
    };
    test('if request is valid, should send status code 200 and success message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn({ deletedCount: 1 }, 'deleteOne');
      await genresControllers.deleteGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(200);
      expect(fakeExpress.responseData.message).toBe(`Genre with id ${genreID} was deleted`);
    });

    test('if genre not found in DB, should send status code 404 and error message', async () => {
      fakeExpress = new FakeExpress(req);
      mockingoose(Genre).toReturn({ deletedCount: 0 }, 'deleteOne');
      await genresControllers.updateGenre(fakeExpress.req as Request, fakeExpress.res as Response);
      expect(fakeExpress.res.statusCode).toBe(404);
      expect(fakeExpress.responseData.message).toBe(`Genre not found`);
    });
  });
});
