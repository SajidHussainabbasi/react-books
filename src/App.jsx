import React from 'react';
import BookSearch from './components/BookSearch';
import { Routes, Route } from 'react-router-dom';
import MyBasket from './components/BasketPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BookSearch />} />
        <Route path="/basket" element={<MyBasket />} />
      </Routes>
    </div>
  );
}

export default App;