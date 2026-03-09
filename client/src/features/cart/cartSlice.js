import { createSlice, createSelector } from '@reduxjs/toolkit';

const getInitial = () => {
  const raw = localStorage.getItem('feedhub-cart');
  return raw ? JSON.parse(raw) : { items: [], storeId: null, storeName: '' };
};

const persist = (state) => localStorage.setItem('feedhub-cart', JSON.stringify(state));

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitial(),
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      if (!state.storeId) {
        state.storeId = payload.storeId;
        state.storeName = payload.storeName;
      }
      const existing = state.items.find((item) => item.itemId === payload.itemId);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...payload, quantity: 1 });
      persist(state);
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((row) => row.itemId === itemId);
      if (item) item.quantity = Math.max(1, quantity);
      persist(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.itemId !== action.payload);
      if (!state.items.length) {
        state.storeId = null;
        state.storeName = '';
      }
      persist(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.storeId = null;
      state.storeName = '';
      persist(state);
    }
  }
});

export const { addToCart, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export const selectCartStoreId = (state) => state.cart.storeId;
export const selectCartCount = createSelector(selectCart, (cart) => cart.items.reduce((sum, item) => sum + item.quantity, 0));
export const selectCartSubtotal = createSelector(selectCart, (cart) => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
export default cartSlice.reducer;
