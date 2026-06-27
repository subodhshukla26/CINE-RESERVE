import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const getInitialAuthState = () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('authUser');

  if (!token) {
    return { token: null, user: null };
  }

  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuthState);

  const login = ({ token, user }) => {
    localStorage.setItem('authToken', token);
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    }
    setAuth({ token, user: user || null });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setAuth({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      isAuthenticated: Boolean(auth.token),
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
