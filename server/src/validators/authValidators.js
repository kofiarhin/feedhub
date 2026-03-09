const { body } = require('express-validator');
const ROLES = require('../constants/roles');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  body('role').optional().isIn(ROLES.ALL).withMessage('invalid role'),
  body('phone').optional().isString().withMessage('phone must be a string'),
  body('address').optional().isString().withMessage('address must be a string')
];

const loginValidator = [
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('password is required')
];

module.exports = { registerValidator, loginValidator };
