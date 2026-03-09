import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null, role: 'user' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role || 'user';
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.role = 'user';
    }
  }
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthRole = (state) => state.auth.role;
export default authSlice.reducer;
