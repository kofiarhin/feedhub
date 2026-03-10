import { createSlice } from '@reduxjs/toolkit';
import { getCartState, setCartState } from '../../utils/storage';

const initialCart = getCartState();

const persistCart = (state) => {
  setCartState({ items: state.items, storeId: state.storeId });
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCart.items || [],
    storeId: initialCart.storeId || null,
  },
  reducers: {
    addItem: (state, action) => {
      const { item, storeId } = action.payload;
      const existing = state.items.find((cartItem) => cartItem.id === item.id);
      if (!existing) {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      } else {
        existing.quantity += item.quantity || 1;
      }
      state.storeId = storeId;
      persistCart(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (!state.items.length) {
        state.storeId = null;
      }
      persistCart(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);
      if (!item) return;
      item.quantity = Math.max(1, quantity);
      persistCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.storeId = null;
      persistCart(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
