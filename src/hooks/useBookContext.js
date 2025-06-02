import { useContext } from 'react';
import { BooksContext } from '../context/BooksContext';

export const useBookContext = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error('useBookContext must be used within a BookProvider');
  return context;
};