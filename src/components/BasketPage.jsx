import React from 'react';
import { useBookContext } from '../hooks/useBookContext';
import { useNavigate } from 'react-router-dom';

const BasketPage = () => {
  const { basket, increaseQuantity, decreaseQuantity } = useBookContext();
  const navigate = useNavigate();

  return (
    <div className="basket-page">
      <h1>My Basket</h1>
      <button onClick={() => navigate('/')}>Go Home</button>

      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        basket.map((book, index) => (
          <div key={index} className="book">
            <img src={book.cover} alt={book.title} />
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Quantity:</strong> {book.quantity}</p>
            <div>
              <button onClick={() => increaseQuantity(book.title)}>+</button>
              <button onClick={() => decreaseQuantity(book.title)}>-</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BasketPage;