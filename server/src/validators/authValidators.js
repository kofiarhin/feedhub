const { body } = require('express-validator');

const customerRegisterValidator = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  body('phone').optional().isString().withMessage('phone must be a string'),
  body('address').optional().isString().withMessage('address must be a string')
];

const partnerRegisterValidator = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  body('store.name').trim().notEmpty().withMessage('store.name is required'),
  body('store.description').trim().notEmpty().withMessage('store.description is required'),
  body('store.address').trim().notEmpty().withMessage('store.address is required'),
  body('store.phone').trim().notEmpty().withMessage('store.phone is required'),
  body('store.cuisineType').trim().notEmpty().withMessage('store.cuisineType is required'),
  body('store.openingHours').trim().notEmpty().withMessage('store.openingHours is required'),
  body('store.logo').optional().isString().withMessage('store.logo must be a string')
];

const loginValidator = [
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('password is required')
];

module.exports = { customerRegisterValidator, partnerRegisterValidator, loginValidator };
