import { NextFunction, Request, Response } from 'express';

import { Movie, Genre, GenreObj, MovieObj } from '../models';
import { AppError } from '../middleware/errorHandlers';

export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies: MovieObj[] = await Movie.find();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const getMoviesByGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genreName = req.params.genreName;
    const genre: GenreObj | null = await Genre.findOne({ name: genreName });
    if (!genre) {
      throw new AppError(400, 'Invalid genre');
    }
    const movies: MovieObj[] = await Movie.find({ genres: genre._id });
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMovie: MovieObj = req.body;
    const savedMovie = await Movie.create(newMovie);
    res.status(201).json({ movie: savedMovie });
  } catch (err) {
    next(err);
  }
};

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedMovie = req.body as MovieObj;
    const result = await Movie.updateOne({ _id: id }, updatedMovie);
    if (!result.matchedCount) {
      throw new AppError(404, 'Movie not found');
    }
    res.status(200).json({ message: `Movie with id ${id} was updated` });
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await Movie.deleteOne({ _id: id });
    if (!result.deletedCount) {
      throw new AppError(404, 'Movie not found');
    }
    res.status(200).json({ message: `Movie with id ${id} was deleted` });
  } catch (err) {
    next(err);
  }
};
