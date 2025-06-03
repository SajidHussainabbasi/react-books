import React from 'react';
import { useBookContext } from '../hooks/useBookContext';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';
import './BookCard.css';

const BookCard = ({ book }) => {
  const {
    basket,
    addToBasket,
    removeFromBasket,
    increaseQuantity,
    decreaseQuantity,
    likes,
    dislikes,
    likeBook,
    dislikeBook,
  } = useBookContext();

  const inBasket = basket.find((item) => item.title === book.title);
  const quantity = inBasket?.quantity || 0;

  return (
    <div className="book-card">
      {book.cover && (
        <img
          src={book.cover}
          alt={book.title}
          className="book-card-image"
        />
      )}

      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Language: {book.language}</p>

      <div className="like-dislike-buttons" style={{ margin: '10px 0' }}>
        <button onClick={() => likeBook(book.title)} style={{ marginRight: '10px', color: 'red' }}>
          <FaHeart /> {likes[book.title] || 0}
        </button>
        <button onClick={() => dislikeBook(book.title)}>
          <FaThumbsDown /> {dislikes[book.title] || 0}
        </button>
      </div>

      <button onClick={() => addToBasket(book)}>Add to Basket</button>

      {inBasket && (
        <div style={{ marginTop: '10px' }}>
          <div>
            <button onClick={() => decreaseQuantity(book.title)}>-</button>
            <span style={{ margin: '0 10px' }}>Quantity: {quantity}</span>
            <button onClick={() => increaseQuantity(book.title)}>+</button>
          </div>
          <button
            onClick={() => removeFromBasket(book.title)}
            style={{ marginTop: '5px' }}
          >
            Remove from Basket
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;