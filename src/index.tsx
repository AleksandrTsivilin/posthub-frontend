import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext/AuthContextProvider';
import { WebsocketProvider } from './Context/WebsocketContext/WebsocketContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WebsocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WebsocketProvider>
  </React.StrictMode>
);

reportWebVitals();
