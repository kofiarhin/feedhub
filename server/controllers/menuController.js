const MenuItem = require('../models/MenuItem');
const Store = require('../models/Store');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { failValidation } = require('../middleware/validate');

const assertOwnership = async (userId, storeId) => {
  const store = await Store.findById(storeId);
  if (!store) throw Object.assign(new Error('Store not found'), { status: 404, code: 'NOT_FOUND' });
  if (String(store.adminId) !== String(userId)) throw Object.assign(new Error('Forbidden'), { status: 403, code: 'FORBIDDEN' });
};

const createMenuItem = async (req, res, next) => {
  try {
    if (!req.body.storeId) return failValidation(res, 'storeId', 'storeId is required');
    await assertOwnership(req.user?._id, req.body.storeId);
    const item = await MenuItem.create(req.body);
    return sendSuccess(res, item, 'Menu item created', 201);
  } catch (error) { return next(error); }
};

const updateMenuItem = async (req, res, next) => {
  try {
    if (!req.params.id) return failValidation(res, 'id', 'id is required');
    const item = await MenuItem.findById(req.params.id);
    if (!item) return sendError(res, 'Menu item not found', 404, 'NOT_FOUND');
    await assertOwnership(req.user?._id, item.storeId);
    Object.assign(item, req.body);
    await item.save();
    return sendSuccess(res, item, 'Menu item updated');
  } catch (error) { return next(error); }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return sendError(res, 'Menu item not found', 404, 'NOT_FOUND');
    await assertOwnership(req.user?._id, item.storeId);
    await item.deleteOne();
    return sendSuccess(res, { deleted: true }, 'Menu item deleted');
  } catch (error) { return next(error); }
};

const toggleAvailability = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return sendError(res, 'Menu item not found', 404, 'NOT_FOUND');
    await assertOwnership(req.user?._id, item.storeId);
    item.available = !item.available;
    await item.save();
    return sendSuccess(res, item, 'Availability updated');
  } catch (error) { return next(error); }
};

module.exports = { createMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability };
