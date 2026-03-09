const Store = require('../models/Store');
const MenuItem = require('../models/MenuItem');

const listStores = async (query) => {
  const { cuisine, category, q } = query;
  const filter = {};
  if (cuisine) filter.cuisineType = cuisine;
  if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }, { cuisineType: new RegExp(q, 'i') }];

  let stores = await Store.find(filter).sort({ createdAt: -1 }).lean();
  if (category) {
    const storeIds = await MenuItem.find({ category }).distinct('storeId');
    stores = stores.filter((store) => storeIds.some((id) => String(id) === String(store._id)));
  }
  return stores;
};

module.exports = { listStores };
