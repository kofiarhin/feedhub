import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartConflictModal: false },
  reducers: {
    setCartConflictModal: (state, action) => {
      state.cartConflictModal = action.payload;
    }
  }
});

export const { setCartConflictModal } = uiSlice.actions;
export default uiSlice.reducer;
