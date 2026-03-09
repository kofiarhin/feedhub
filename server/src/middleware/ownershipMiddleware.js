const mongoose = require('mongoose');
const Store = require('../models/Store');
const ApiError = require('../utils/ApiError');

const ensureStoreOwnership = async (req, _res, next) => {
  const { id, storeId } = req.params;
  const targetStoreId = storeId || req.body.storeId || id;

  if (!mongoose.Types.ObjectId.isValid(targetStoreId)) {
    return next(new ApiError(400, 'Invalid store id', 'VALIDATION_ERROR'));
  }

  const store = await Store.findById(targetStoreId);
  if (!store) return next(new ApiError(404, 'Store not found', 'NOT_FOUND'));
  if (String(store.adminId) !== String(req.user._id)) {
    return next(new ApiError(403, 'You can only manage your own store', 'FORBIDDEN'));
  }

  req.store = store;
  return next();
};

module.exports = { ensureStoreOwnership };
