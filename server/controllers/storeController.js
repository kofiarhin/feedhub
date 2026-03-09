const Store = require('../models/Store');
const MenuItem = require('../models/MenuItem');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { listStores } = require('../services/storeService');
const { failValidation } = require('../middleware/validate');

const getStores = async (req, res, next) => {
  try {
    const stores = await listStores(req.query);
    return sendSuccess(res, stores);
  } catch (error) { return next(error); }
};

const getStore = async (req, res, next) => {
  try {
    if (!req.params.id) return failValidation(res, 'id', 'id is required');
    const store = await Store.findById(req.params.id);
    if (!store) return sendError(res, 'Store not found', 404, 'NOT_FOUND');
    return sendSuccess(res, store);
  } catch (error) { return next(error); }
};

const createStore = async (req, res, next) => {
  try {
    if (!req.body.name) return failValidation(res, 'name', 'name is required');
    if (!req.user) return sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');
    const exists = await Store.findOne({ adminId: req.user._id });
    if (exists) return sendError(res, 'Admin already has a store', 400, 'STORE_EXISTS');
    const store = await Store.create({ ...req.body, adminId: req.user._id });
    return sendSuccess(res, store, 'Store created', 201);
  } catch (error) { return next(error); }
};

const updateStore = async (req, res, next) => {
  try {
    if (!req.params.id) return failValidation(res, 'id', 'id is required');
    const store = await Store.findById(req.params.id);
    if (!store) return sendError(res, 'Store not found', 404, 'NOT_FOUND');
    if (String(store.adminId) !== String(req.user?._id)) return sendError(res, 'Forbidden', 403, 'FORBIDDEN');
    Object.assign(store, req.body);
    await store.save();
    return sendSuccess(res, store, 'Store updated');
  } catch (error) { return next(error); }
};

const getStoreMenu = async (req, res, next) => {
  try {
    if (!req.params.id) return failValidation(res, 'id', 'id is required');
    const filter = { storeId: req.params.id };
    if (req.query.available === 'true') filter.available = true;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.q) filter.$or = [{ name: new RegExp(req.query.q, 'i') }, { tags: req.query.q }];
    const items = await MenuItem.find(filter).sort({ category: 1, createdAt: -1 });
    return sendSuccess(res, items);
  } catch (error) { return next(error); }
};

module.exports = { getStores, getStore, createStore, updateStore, getStoreMenu };
