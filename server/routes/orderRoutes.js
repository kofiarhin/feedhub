const express = require('express');
const { requireAuth } = require('@clerk/express');
const { requireRole } = require('../middleware/requireRole');
const { createOrder, getMyOrders, getStoreOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/my', requireAuth(), getMyOrders);
router.get('/store/:storeId', requireAuth(), requireRole('admin'), getStoreOrders);
router.patch('/:id/status', requireAuth(), requireRole('admin'), updateOrderStatus);

module.exports = router;
