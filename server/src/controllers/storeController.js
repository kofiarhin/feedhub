const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');
const storeService = require('../services/storeService');

const listStores = asyncHandler(async (req, res) => {
  const stores = await storeService.listStores(req.query);
  return successResponse(res, stores, 'Stores fetched');
});

const getStore = asyncHandler(async (req, res) => {
  const store = await storeService.getStoreByIdOrSlug(req.params.id);
  return successResponse(res, store, 'Store fetched');
});

const createStore = asyncHandler(async (req, res) => {
  const store = await storeService.createStore(req.body, req.user._id);
  return successResponse(res, store, 'Store created', 201);
});

const updateStore = asyncHandler(async (req, res) => {
  const store = await storeService.updateStore(req.params.id, req.body, req.user._id);
  return successResponse(res, store, 'Store updated');
});

const getStoreMenu = asyncHandler(async (req, res) => {
  const menu = await storeService.getStoreMenu(req.params.id);
  return successResponse(res, menu, 'Store menu fetched');
});

module.exports = { listStores, getStore, createStore, updateStore, getStoreMenu };
