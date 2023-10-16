import { body, param } from 'express-validator';

export const movieCreateValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('releaseDate').trim().notEmpty().withMessage('Release date is required'),
  body('releaseDate').isDate().withMessage('Invalid release date'),
  body('genres').notEmpty().withMessage('Genres is required'),
  body('genres').isMongoId().withMessage('Invalid genres'),
];

export const movieUpdateValidationRules = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
  body('releaseDate').isDate().withMessage('Invalid release date'),
  body('genres').isMongoId().withMessage('Invalid genres'),
];

export const movieDeleteValidationRules = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];
