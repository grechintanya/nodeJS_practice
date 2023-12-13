import { body, param, ValidationChain } from 'express-validator';

export const movieCreateValidationRules: ValidationChain[] = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('releaseDate').trim().notEmpty().withMessage('Release date is required'),
  body('releaseDate').isDate().withMessage('Invalid release date'),
  body('genres').notEmpty().withMessage('Genres is required'),
  body('genres').isMongoId().withMessage('Invalid genres'),
];

export const movieUpdateValidationRules: ValidationChain[] = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
  ...movieCreateValidationRules,
];

export const movieDeleteValidationRules: ValidationChain[] = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];
