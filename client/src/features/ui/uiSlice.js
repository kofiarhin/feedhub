import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    cartConflict: {
      open: false,
      pendingItem: null,
      pendingStoreId: null,
    },
  },
  reducers: {
    openCartConflict: (state, action) => {
      state.cartConflict = { open: true, ...action.payload };
    },
    closeCartConflict: (state) => {
      state.cartConflict = { open: false, pendingItem: null, pendingStoreId: null };
    },
  },
});

export const { openCartConflict, closeCartConflict } = uiSlice.actions;
export default uiSlice.reducer;
