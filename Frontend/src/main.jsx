import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import App from './App';
import { store } from './redux/store';
import { getStoredAuth, restoreSession } from './redux/authSlice';
import './index.css';

const AuthBootstrap = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const storedAuth = getStoredAuth();

    if (storedAuth.token) {
      dispatch(restoreSession(storedAuth));
    }
  }, [dispatch]);

  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthBootstrap>
          <App />
          <Toaster position="top-right" />
        </AuthBootstrap>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
