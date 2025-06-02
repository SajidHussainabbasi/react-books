import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BooksProvider } from './context/BooksContext'; // <-- import the provider
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BooksProvider>
        <App />
      </BooksProvider>
    </BrowserRouter>
  </React.StrictMode>
);