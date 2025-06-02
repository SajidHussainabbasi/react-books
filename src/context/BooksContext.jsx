import React, { createContext, useState } from 'react';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = (book) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.title === book.title);
      if (existing) {
        return prev.map((item) =>
          item.title === book.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
        item.title === title
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (title) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.title === title
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <BooksContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};