const MenuItem = require('../models/MenuItem');
const Store = require('../models/Store');
const ApiError = require('../utils/ApiError');

const assertAdminOwnsStore = async (storeId, adminId) => {
  const store = await Store.findById(storeId);
  if (!store) throw new ApiError(404, 'Store not found', 'NOT_FOUND');
  if (String(store.adminId) !== String(adminId)) {
    throw new ApiError(403, 'You can only manage your own store items', 'FORBIDDEN');
  }
  return store;
};

const createMenuItem = async (payload, adminId) => {
  await assertAdminOwnsStore(payload.storeId, adminId);
  return MenuItem.create(payload);
};

const updateMenuItem = async (id, payload, adminId) => {
  const menuItem = await MenuItem.findById(id);
  if (!menuItem) throw new ApiError(404, 'Menu item not found', 'NOT_FOUND');

  await assertAdminOwnsStore(menuItem.storeId, adminId);
  Object.assign(menuItem, payload);
  await menuItem.save();
  return menuItem;
};

const deleteMenuItem = async (id, adminId) => {
  const menuItem = await MenuItem.findById(id);
  if (!menuItem) throw new ApiError(404, 'Menu item not found', 'NOT_FOUND');

  await assertAdminOwnsStore(menuItem.storeId, adminId);
  await menuItem.deleteOne();
  return null;
};

const toggleMenuAvailability = async (id, adminId) => {
  const menuItem = await MenuItem.findById(id);
  if (!menuItem) throw new ApiError(404, 'Menu item not found', 'NOT_FOUND');

  await assertAdminOwnsStore(menuItem.storeId, adminId);
  menuItem.available = !menuItem.available;
  await menuItem.save();
  return menuItem;
};

module.exports = { createMenuItem, updateMenuItem, deleteMenuItem, toggleMenuAvailability };
