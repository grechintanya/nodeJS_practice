import { body, param } from 'express-validator';

export const genreCreateValidationRules = [body('name').trim().notEmpty().withMessage('Name is required')];

export const genreUpdateValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];
export const genreDeleteValidationRules = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];
