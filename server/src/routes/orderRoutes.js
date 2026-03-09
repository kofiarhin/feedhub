const express = require('express');
const controller = require('../controllers/orderController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createOrderValidator, updateOrderStatusValidator, storeOrdersValidator } = require('../validators/orderValidators');
const ROLES = require('../constants/roles');

const router = express.Router();

router.post('/', optionalAuth, createOrderValidator, validateRequest, controller.createOrder);
router.get('/my', protect, authorizeRoles(ROLES.CUSTOMER), controller.getMyOrders);
router.get('/store/:storeId', protect, authorizeRoles(ROLES.ADMIN), storeOrdersValidator, validateRequest, controller.getStoreOrders);
router.patch('/:id/status', protect, authorizeRoles(ROLES.ADMIN), updateOrderStatusValidator, validateRequest, controller.updateOrderStatus);

module.exports = router;
