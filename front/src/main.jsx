import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppoimentContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppointmentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppointmentProvider>
  </AuthProvider>
);