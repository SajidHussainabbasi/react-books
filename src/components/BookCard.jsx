import React, { useState } from 'react';
import './BookCard.css';

const BookCard = ({ book }) => {
  // State for like and dislike counts
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  // State to track if user liked or disliked (to prevent double counts)
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike' or null

  const handleLike = () => {
    if (userAction === 'like') return; // prevent double like
    if (userAction === 'dislike') {
      setDislikeCount(dislikeCount - 1);
    }
    setLikeCount(likeCount + 1);
    setUserAction('like');
  };

  const handleDislike = () => {
    if (userAction === 'dislike') return; // prevent double dislike
    if (userAction === 'like') {
      setLikeCount(likeCount - 1);
    }
    setDislikeCount(dislikeCount + 1);
    setUserAction('dislike');
  };

  return (
    <div className="book">
      {book.cover && <img src={book.cover} alt={book.title} />}
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>First Published:</strong> {book.year}</p>
      <p><strong>Languages:</strong> {book.language}</p>
      <div className="icons">
        <button
          className={userAction === 'like' ? 'liked' : ''}
          onClick={handleLike}
        >
          ❤️ {likeCount}
        </button>
        <button
          className={userAction === 'dislike' ? 'disliked' : ''}
          onClick={handleDislike}
        >
          👎 {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default BookCard;