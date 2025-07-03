import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { PopupProvider } from './context/PopupContext';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupProvider>
    <BrowserRouter> 
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    </PopupProvider>
  </React.StrictMode>
);