export const queryKeys = {
  currentUser: ['current-user'],
  stores: (params = {}) => ['stores', params],
  store: (id) => ['store', id],
  storeMenu: (id, params = {}) => ['store-menu', id, params],
  storeOrders: (storeId) => ['store-orders', storeId],
  myOrders: ['my-orders']
};
