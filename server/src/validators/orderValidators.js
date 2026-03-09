const { body, param } = require('express-validator');
const { ALL_FULFILLMENT_TYPES } = require('../constants/fulfillmentTypes');
const { VALID_ORDER_STATUS } = require('../constants/orderStatus');

const createOrderValidator = [
  body('storeId').isMongoId().withMessage('storeId is required'),
  body('items').isArray({ min: 1 }).withMessage('items must be a non-empty array'),
  body('items.*.itemId').isMongoId().withMessage('itemId must be a valid id'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('quantity must be >= 1'),
  body('customerName').trim().notEmpty().withMessage('customerName is required'),
  body('phone').trim().notEmpty().withMessage('phone is required'),
  body('address').optional().isString().withMessage('address must be a string'),
  body('notes').optional().isString().withMessage('notes must be a string'),
  body('fulfillmentType').optional().isIn(ALL_FULFILLMENT_TYPES).withMessage('invalid fulfillment type')
];

const updateOrderStatusValidator = [
  param('id').isMongoId().withMessage('invalid order id'),
  body('status').isIn(VALID_ORDER_STATUS).withMessage('invalid status')
];

const storeOrdersValidator = [param('storeId').isMongoId().withMessage('invalid store id')];

module.exports = { createOrderValidator, updateOrderStatusValidator, storeOrdersValidator };
