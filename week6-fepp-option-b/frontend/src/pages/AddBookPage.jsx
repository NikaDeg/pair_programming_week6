import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [genre, setGenre] = useState('');
  const [isAvailable, setIsAvailable] = useState('true');
  const [dueDate, setDueDate] = useState('');
  const [borrower, setBorrower] = useState('');

  const navigate = useNavigate();

  const addBook = async (newBook) => {
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) throw new Error('Failed to add book');
    } catch (error) {
      console.error(error);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log('submitForm called');
    const newBook = {
      title,
      author,
      isbn,
      publisher,
      genre,
      availability: {
        isAvailable: isAvailable === 'true',
        dueDate: dueDate || null,
        borrower,
      },
    };
    addBook(newBook);
    navigate('/');
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" required />
        <label>Author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" required />
        <label>ISBN:</label>
        <input value={isbn} onChange={(e) => setIsbn(e.target.value)} type="text" required />
        <label>Publisher:</label>
        <input
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          type="text"
          required
        />
        <label>Genre:</label>
        <input value={genre} onChange={(e) => setGenre(e.target.value)} type="text" required />
        <label>Available:</label>
        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Due Date:</label>
        <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" />
        <label>Borrower:</label>
        <input value={borrower} onChange={(e) => setBorrower(e.target.value)} type="text" />
        <button onClick={() => submitForm}>Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
