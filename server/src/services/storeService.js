const Store = require('../models/Store');
const MenuItem = require('../models/MenuItem');
const ApiError = require('../utils/ApiError');

const buildStoreFilters = async (query) => {
  const filter = {};
  if (query.q) {
    filter.$or = [
      { name: { $regex: query.q, $options: 'i' } },
      { description: { $regex: query.q, $options: 'i' } },
      { cuisineType: { $regex: query.q, $options: 'i' } }
    ];
  }
  if (query.cuisine) filter.cuisineType = { $regex: `^${query.cuisine}$`, $options: 'i' };

  if (query.category) {
    const storeIds = await MenuItem.distinct('storeId', {
      category: { $regex: `^${query.category}$`, $options: 'i' }
    });
    filter._id = { $in: storeIds };
  }

  return filter;
};

const listStores = async (query) => {
  const filter = await buildStoreFilters(query);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);
  return Store.find(filter).sort({ createdAt: -1 }).limit(limit);
};

const getStoreById = async (id) => {
  const store = await Store.findById(id);
  if (!store) throw new ApiError(404, 'Store not found', 'NOT_FOUND');
  return store;
};

const createStore = async (data, adminId) => {
  const existing = await Store.findOne({ adminId });
  if (existing) throw new ApiError(409, 'Admin already owns a store', 'DUPLICATE_KEY');
  return Store.create({ ...data, adminId });
};

const updateStore = async (id, payload, adminId) => {
  const store = await Store.findById(id);
  if (!store) throw new ApiError(404, 'Store not found', 'NOT_FOUND');
  if (String(store.adminId) !== String(adminId)) {
    throw new ApiError(403, 'You can only update your own store', 'FORBIDDEN');
  }

  Object.assign(store, payload);
  await store.save();
  return store;
};

const getStoreMenu = async (storeId) => {
  await getStoreById(storeId);
  return MenuItem.find({ storeId }).sort({ category: 1, createdAt: -1 });
};

module.exports = { listStores, getStoreById, createStore, updateStore, getStoreMenu };
