const Order = require('../models/Order');
const Store = require('../models/Store');
const MenuItem = require('../models/MenuItem');
const ApiError = require('../utils/ApiError');
const { ORDER_STATUS, STATUS_TRANSITIONS } = require('../constants/orderStatus');

const createOrder = async (payload, authUser) => {
  const { storeId, items, customerName, phone, address, notes, fulfillmentType } = payload;

  const store = await Store.findById(storeId);
  if (!store) throw new ApiError(404, 'Store not found', 'NOT_FOUND');

  const uniqueItemIds = [...new Set(items.map((item) => item.itemId))];
  const menuItems = await MenuItem.find({ _id: { $in: uniqueItemIds } });
  if (menuItems.length !== uniqueItemIds.length) {
    throw new ApiError(400, 'One or more menu items are invalid', 'INVALID_MENU_ITEMS');
  }

  const menuMap = new Map(menuItems.map((item) => [String(item._id), item]));
  const normalizedItems = [];
  let totalPrice = 0;

  for (const orderItem of items) {
    const menuItem = menuMap.get(String(orderItem.itemId));
    if (!menuItem) throw new ApiError(400, 'Invalid menu item', 'INVALID_MENU_ITEMS');
    if (String(menuItem.storeId) !== String(storeId)) {
      throw new ApiError(400, 'All items must belong to the same store', 'MULTI_STORE_ORDER_NOT_ALLOWED');
    }
    if (!menuItem.available) {
      throw new ApiError(400, `${menuItem.name} is currently unavailable`, 'ITEM_UNAVAILABLE');
    }

    const quantity = Number(orderItem.quantity);
    totalPrice += menuItem.price * quantity;
    normalizedItems.push({ itemId: menuItem._id, name: menuItem.name, price: menuItem.price, quantity });
  }


  if (authUser) {
    const shouldUpdatePhone = !authUser.phone || authUser.phone !== phone;
    const shouldUpdateAddress = !authUser.address || authUser.address !== address;
    if (shouldUpdatePhone || shouldUpdateAddress || authUser.name !== customerName) {
      authUser.phone = phone;
      authUser.address = address;
      authUser.name = customerName;
      await authUser.save();
    }
  }

  return Order.create({
    storeId,
    userId: authUser ? authUser._id : undefined,
    customerName,
    phone,
    address,
    notes,
    fulfillmentType,
    items: normalizedItems,
    totalPrice,
    status: ORDER_STATUS.PENDING
  });
};

const getMyOrders = async (userId) =>
  Order.find({ userId }).populate('storeId', 'name slug').sort({ createdAt: -1 });

const getStoreOrders = async (storeId, adminId) => {
  const store = await Store.findById(storeId);
  if (!store) throw new ApiError(404, 'Store not found', 'NOT_FOUND');
  if (String(store.adminId) !== String(adminId)) {
    throw new ApiError(403, 'You can only access your own store orders', 'FORBIDDEN');
  }

  return Order.find({ storeId }).sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status, adminId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, 'Order not found', 'NOT_FOUND');

  const store = await Store.findById(order.storeId);
  if (!store || String(store.adminId) !== String(adminId)) {
    throw new ApiError(403, 'You can only update orders in your own store', 'FORBIDDEN');
  }

  const allowed = STATUS_TRANSITIONS[order.status] || [];
  if (!allowed.includes(status)) {
    throw new ApiError(400, `Invalid status transition from ${order.status} to ${status}`, 'INVALID_STATUS_TRANSITION');
  }

  order.status = status;
  await order.save();
  return order;
};

module.exports = { createOrder, getMyOrders, getStoreOrders, updateOrderStatus };
