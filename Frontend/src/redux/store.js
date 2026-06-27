import { configureStore } from '@reduxjs/toolkit';
import authReducer, { getStoredAuth } from './authSlice';

const storedAuth = getStoredAuth();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      ...storedAuth,
      isAuthenticated: Boolean(storedAuth.token),
      loading: false,
    },
  },
});
