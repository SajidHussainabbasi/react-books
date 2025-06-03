import React, { useState } from 'react';
import { BooksContext } from '../context/BooksContext';

export const BookProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  const addToBasket = (book) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.title === book.title);
      if (existing) {
        return prev.map((item) =>
          item.title === book.title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromBasket = (title) => {
    setBasket((prev) => prev.filter((item) => item.title !== title));
  };

  const increaseQuantity = (title) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (title) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.title === title ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const likeBook = (title) => {
    setLikes((prev) => ({ ...prev, [title]: (prev[title] || 0) + 1 }));
  };

  const dislikeBook = (title) => {
    setDislikes((prev) => ({ ...prev, [title]: (prev[title] || 0) + 1 }));
  };

  return (
    <BooksContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        increaseQuantity,
        decreaseQuantity,
        likes,
        dislikes,
        likeBook,
        dislikeBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};