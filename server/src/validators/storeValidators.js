const { body, param, query } = require('express-validator');

const createStoreValidator = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('slug').trim().matches(/^[a-z0-9-]+$/).withMessage('slug must be lowercase and hyphenated'),
  body('description').trim().notEmpty().withMessage('description is required'),
  body('address').trim().notEmpty().withMessage('address is required'),
  body('phone').trim().notEmpty().withMessage('phone is required'),
  body('cuisineType').trim().notEmpty().withMessage('cuisineType is required'),
  body('openingHours').trim().notEmpty().withMessage('openingHours is required'),
  body('logo').optional().isString().withMessage('logo must be a string')
];

const updateStoreValidator = [
  param('id').isMongoId().withMessage('invalid store id'),
  body('name').optional().trim().notEmpty().withMessage('name cannot be empty'),
  body('slug').optional().trim().matches(/^[a-z0-9-]+$/).withMessage('slug must be lowercase and hyphenated'),
  body('description').optional().trim().notEmpty().withMessage('description cannot be empty'),
  body('address').optional().trim().notEmpty().withMessage('address cannot be empty'),
  body('phone').optional().trim().notEmpty().withMessage('phone cannot be empty'),
  body('cuisineType').optional().trim().notEmpty().withMessage('cuisineType cannot be empty'),
  body('openingHours').optional().trim().notEmpty().withMessage('openingHours cannot be empty')
];

const listStoresValidator = [
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100')
];

module.exports = { createStoreValidator, updateStoreValidator, listStoresValidator };
