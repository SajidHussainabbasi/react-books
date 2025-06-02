import React from 'react';
import { useBookContext } from '../hooks/useBookContext';
import './BookCard.css'; // optional styling

const BookCard = ({ book }) => {
  const {
    addToBasket,
    removeFromBasket,
    increaseQuantity,
    decreaseQuantity,
    basket,
  } = useBookContext();

  const inBasket = basket.find((item) => item.title === book.title);
  const quantity = inBasket?.quantity || 0;

  return (
    <div className="book-card">
      {book.cover && <img src={book.cover} alt={book.title} />}
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Language: {book.language}</p>

      <button onClick={() => addToBasket(book)}>Add to Basket</button>
      {inBasket && (
        <>
          <div>
            <button onClick={() => decreaseQuantity(book.title)}>-</button>
            <span style={{ margin: '0 10px' }}>Quantity: {quantity}</span>
            <button onClick={() => increaseQuantity(book.title)}>+</button>
          </div>
          <button onClick={() => removeFromBasket(book.title)} style={{ marginTop: '5px' }}>
            Remove from Basket
          </button>
        </>
      )}
    </div>
  );
};

export default BookCard