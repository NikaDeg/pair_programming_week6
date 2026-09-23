import { Link } from 'react-router-dom';

const BookListing = ({ book }) => {
  return (
    <div className="book-preview">
      <Link to={`/books/${book.id}`}>
        <h2>Book Title: {book.title}</h2>
        <p>Author: {book.author}</p>
        <p>ISBN: {book.isbn}</p>
        <p>Publisher: {book.publisher}</p>
        <p>Genre: {book.genre}</p>
        <p>Available: {book.availability.isAvailable ? 'Yes' : 'No'}</p>
      </Link>
    </div>
  );
};

export default BookListing;
