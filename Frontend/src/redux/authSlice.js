import { createSlice } from '@reduxjs/toolkit';

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';

const parseStoredUser = (value) => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const decoded = atob(paddedBase64);
    const json = decodeURIComponent(
      Array.from(decoded, (char) =>
        `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`
      ).join('')
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = decodeJwtPayload(token);

  if (!payload?.exp) {
    return false;
  }

  return payload.exp * 1000 <= Date.now();
};

const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const getStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const user = parseStoredUser(localStorage.getItem(AUTH_USER_KEY));

  if (!token) {
    return { token: null, user: null };
  }

  if (isTokenExpired(token)) {
    clearStoredAuth();
    return { token: null, user: null };
  }

  return { token, user };
};

const storedAuth = getStoredAuth();

const initialState = {
  user: storedAuth.user,
  token: storedAuth.token,
  isAuthenticated: Boolean(storedAuth.token),
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    restoreSession: (state, action) => {
      state.user = action.payload?.user || null;
      state.token = action.payload?.token || null;
      state.isAuthenticated = Boolean(action.payload?.token);
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = Boolean(action.payload);
    },
  },
});

export const { loginSuccess, logout, restoreSession, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
