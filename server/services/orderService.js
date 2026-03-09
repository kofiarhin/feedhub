const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const { ORDER_TRANSITIONS } = require('../constants/appConstants');

const buildOrderFromCart = async ({ storeId, items }) => {
  const ids = items.map((item) => new mongoose.Types.ObjectId(item.itemId));
  const menuItems = await MenuItem.find({ _id: { $in: ids }, storeId, available: true }).lean();

  if (menuItems.length !== items.length) throw Object.assign(new Error('Some items are unavailable'), { status: 400, code: 'ITEM_UNAVAILABLE' });

  const normalizedItems = items.map((cartItem) => {
    const menuItem = menuItems.find((dbItem) => String(dbItem._id) === String(cartItem.itemId));
    if (!menuItem) throw Object.assign(new Error('Invalid item in cart'), { status: 400, code: 'INVALID_ITEM' });
    return {
      itemId: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: cartItem.quantity
    };
  });

  const totalPrice = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { normalizedItems, totalPrice };
};

const validateOrderTransition = (currentStatus, nextStatus) => ORDER_TRANSITIONS[currentStatus]?.includes(nextStatus);

module.exports = { buildOrderFromCart, validateOrderTransition };
