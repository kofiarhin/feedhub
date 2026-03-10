export const queryKeys = {
  health: ['health'],
  tags: ['tags'],
  auth: {
    me: ['auth', 'me'],
  },
  stores: {
    all: ['stores'],
    detail: (storeId) => ['stores', storeId],
    menu: (storeId) => ['stores', storeId, 'menu'],
  },
  orders: {
    my: ['orders', 'my'],
    store: (storeId) => ['orders', 'store', storeId],
  },
};
