import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BooksContextProvider } from './context/BooksContext';
import { AuthContextProvider } from './context/AuthContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
