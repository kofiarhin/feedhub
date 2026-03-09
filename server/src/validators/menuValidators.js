const { body, param } = require('express-validator');
const MENU_TAGS = require('../constants/menuTags');

const createMenuValidator = [
  body('storeId').isMongoId().withMessage('valid storeId is required'),
  body('name').trim().notEmpty().withMessage('name is required'),
  body('description').trim().notEmpty().withMessage('description is required'),
  body('price').isFloat({ min: 0 }).withMessage('price must be a positive number'),
  body('category').trim().notEmpty().withMessage('category is required'),
  body('image').optional().isString().withMessage('image must be a string'),
  body('tags').optional().isArray().withMessage('tags must be an array'),
  body('tags.*').optional().isIn(MENU_TAGS).withMessage('invalid tag')
];

const updateMenuValidator = [
  param('id').isMongoId().withMessage('invalid menu item id'),
  body('name').optional().trim().notEmpty().withMessage('name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('description cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('price must be a positive number'),
  body('category').optional().trim().notEmpty().withMessage('category cannot be empty'),
  body('tags').optional().isArray().withMessage('tags must be an array'),
  body('tags.*').optional().isIn(MENU_TAGS).withMessage('invalid tag'),
  body('available').optional().isBoolean().withMessage('available must be boolean')
];

const idValidator = [param('id').isMongoId().withMessage('invalid id')];

module.exports = { createMenuValidator, updateMenuValidator, idValidator };
