const Book = require('../models/bookModel');
const mongoose = require('mongoose');

// GET /books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve books', error: error.message });
  }
};

// POST /books
const createBook = async (req, res) => {
  try {
    const newBook = await Book.create({ ...req.body });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create book', error: error.message });
  }
};

// GET /books/:bookId
const getBookById = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  // question about ID:
  try {
    const book = await Book.findById({ _id: bookId });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not foud' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed ' });
  }
};

// PUT /books/:bookId
const updateBook = async (req, res) => {
  const { bookId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: 'Invalid book Id' });
  }

  try {
    const updateBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { ...req.body },
      { returnDocument: 'after' },
    );
    if (updateBook) {
      res.status(200).json(updateBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'failed to update' });
  }
};

// DELETE /books/:bookId
const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'invalid book id' });
  }

  try {
    const deleteBook = await Book.findOneAndDelete({ _id: bookId });
    if (deleteBook) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
