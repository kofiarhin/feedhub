const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');
const orderService = require('../services/orderService');

const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user);
  return successResponse(res, order, 'Order created', 201);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user._id);
  return successResponse(res, orders, 'My orders fetched');
});

const getStoreOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getStoreOrders(req.params.storeId, req.user._id);
  return successResponse(res, orders, 'Store orders fetched');
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status, req.user._id);
  return successResponse(res, order, 'Order status updated');
});

module.exports = { createOrder, getMyOrders, getStoreOrders, updateOrderStatus };
