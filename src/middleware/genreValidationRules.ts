import { body, param, ValidationChain } from 'express-validator';

export const genreCreateValidationRules: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Name is required'),
];

export const genreUpdateValidationRules: ValidationChain[] = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
  body('name').trim().notEmpty().withMessage('Name is required'),
];
export const genreDeleteValidationRules: ValidationChain[] = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];
