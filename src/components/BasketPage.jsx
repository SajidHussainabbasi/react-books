import React from 'react';
import { useBookContext } from '../hooks/useBookContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';

const BasketPage = () => {
  const {
    basket,
    increaseQuantity,
    decreaseQuantity,
    likes,
    dislikes,
    likeBook,
    dislikeBook,
  } = useBookContext();

  const navigate = useNavigate();

  return (
    <div className="basket-page">
      <h1>My Basket</h1>
      <button onClick={() => navigate('/')}>Go Home</button>

      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        basket.map((book, index) => (
          <div
            key={index}
            className="book"
            style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}
          >
            <img src={book.cover} alt={book.title} style={{ width: '100px' }} />
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Quantity:</strong> {book.quantity}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
              <button onClick={() => likeBook(book.title)} style={{ color: 'red' }}>
                <FaHeart /> {likes[book.title] || 0}
              </button>
              <button onClick={() => dislikeBook(book.title)}>
                <FaThumbsDown /> {dislikes[book.title] || 0}
              </button>
            </div>

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