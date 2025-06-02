import React, { useState } from 'react';
import BookCard from './BookCard';
import './BookSearch.css';
import { fetchBookByTitle } from '../api-calls/api-calls'; 
import { useBookContext } from '../hooks/useBookContext';
import { useNavigate } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';  // Import the basket icon

const defaultBooks = [
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    language: 'English',
    cover: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    year: 1851,
    language: 'English',
    cover: 'https://covers.openlibrary.org/b/id/5553216-L.jpg',
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    year: 1869,
    language: 'Russian',
    cover: 'https://covers.openlibrary.org/b/id/8235111-L.jpg',
  },
];

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState(defaultBooks);
  const [error, setError] = useState('');
  
  const { basket } = useBookContext();
  const navigate = useNavigate();

  const fetchBook = async () => {
    if (!query.trim()) {
      setError('Please enter the book title.');
      setBooks(defaultBooks);
      return;
    }

    setError('');

    try {
      const data = await fetchBookByTitle(query);
      const firstBook = data.docs[0];

      if (!firstBook) {
        setError('No book found. Showing default books.');
        setBooks(defaultBooks);
        return;
      }

      setBooks([{
        title: firstBook.title,
        author: firstBook.author_name?.[0] || 'Unknown',
        year: firstBook.first_publish_year || 'N/A',
        language: firstBook.language?.join(', ') || 'N/A',
        cover: firstBook.cover_i
          ? `https://covers.openlibrary.org/b/id/${firstBook.cover_i}-L.jpg`
          : null,
      }]);
    } catch (err) {
      console.error(err);
      setError('Error fetching book data. Showing default books.');
      setBooks(defaultBooks);
    }
  };

  return (
    <div className="container">
      <h1>Book Search</h1>

      {/* Basket Icon with Label */}
      <div
        className="basket-icon"
        onClick={() => navigate('/basket')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
          fontSize: '20px',
          color: '#333',
          userSelect: 'none',
        }}
        title="Go to Basket"
      >
        <span style={{ marginRight: '8px' }}>My Basket</span>
        <SlBasket />
        <span style={{ marginLeft: '6px', fontWeight: 'bold' }}>{basket.length}</span>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError('');
          }}
        />
        <button onClick={fetchBook}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="books-list">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookSearch;