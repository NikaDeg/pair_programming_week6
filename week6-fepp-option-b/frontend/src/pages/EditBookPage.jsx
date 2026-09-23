import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [genre, setGenre] = useState('');
  const [isAvailable, setIsAvailable] = useState('true');
  const [dueDate, setDueDate] = useState('');
  const [borrower, setBorrower] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setAuthor(data.author);
      setIsbn(data.isbn);
      setPublisher(data.publisher);
      setGenre(data.genre);
      setIsAvailable(data.availability.isAvailable ? 'true' : 'false');
      setDueDate(data.availability.dueDate ? data.availability.dueDate.split('T')[0] : '');
      setBorrower(data.availability.borrower || '');
    };
    fetchBook();
  }, [id]);

  const updateBook = async (updatedBook) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      if (!res.ok) throw new Error('Failed to update book');
      return true;
    } catch (error) {
      console.error('Error updating book:', error);
      return false;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const updatedBook = {
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
    updateBook(updatedBook);
    navigate(`/books/${id}`);
  };

  return (
    <div className="create">
      <h2>Update Book</h2>
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
        <button onClick={() => submitForm}>Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
