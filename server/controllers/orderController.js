const Order = require('../models/Order');
const Store = require('../models/Store');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { failValidation } = require('../middleware/validate');
const { buildOrderFromCart, validateOrderTransition } = require('../services/orderService');

const createOrder = async (req, res, next) => {
  try {
    const { storeId, customerName, phone, address, fulfillmentType, items, notes } = req.body;
    if (!storeId) return failValidation(res, 'storeId', 'storeId is required');
    if (!customerName) return failValidation(res, 'customerName', 'customerName is required');
    if (!Array.isArray(items) || !items.length) return failValidation(res, 'items', 'items are required');

    const orderData = await buildOrderFromCart({ storeId, items });
    const order = await Order.create({
      storeId,
      userId: req.user?._id || null,
      customerName,
      phone,
      address,
      notes: notes || '',
      fulfillmentType,
      items: orderData.normalizedItems,
      totalPrice: orderData.totalPrice
    });

    return sendSuccess(res, order, 'Order created', 201);
  } catch (error) { return next(error); }
};

const getMyOrders = async (req, res, next) => {
  try {
    if (!req.user) return sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (error) { return next(error); }
};

const getStoreOrders = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) return sendError(res, 'Store not found', 404, 'NOT_FOUND');
    if (String(store.adminId) !== String(req.user?._id)) return sendError(res, 'Forbidden', 403, 'FORBIDDEN');
    const orders = await Order.find({ storeId: req.params.storeId }).sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (error) { return next(error); }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return sendError(res, 'Order not found', 404, 'NOT_FOUND');
    const store = await Store.findById(order.storeId);
    if (String(store.adminId) !== String(req.user?._id)) return sendError(res, 'Forbidden', 403, 'FORBIDDEN');

    if (!validateOrderTransition(order.status, req.body.status)) {
      return sendError(res, 'Invalid status transition', 400, 'INVALID_STATUS_TRANSITION');
    }

    order.status = req.body.status;
    await order.save();
    return sendSuccess(res, order, 'Order status updated');
  } catch (error) { return next(error); }
};

module.exports = { createOrder, getMyOrders, getStoreOrders, updateOrderStatus };
