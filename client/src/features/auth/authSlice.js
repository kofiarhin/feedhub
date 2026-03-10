import { createSlice } from '@reduxjs/toolkit';
import { clearAuthToken, clearAuthUser, getAuthToken, getAuthUser, setAuthToken, setAuthUser } from '../../utils/storage';

const initialState = {
  token: getAuthToken() || null,
  user: getAuthUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token || null;
      state.user = user || null;
      setAuthToken(state.token);
      setAuthUser(state.user);
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      setAuthUser(action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      clearAuthToken();
      clearAuthUser();
    },
  },
});

export const { setCredentials, setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
