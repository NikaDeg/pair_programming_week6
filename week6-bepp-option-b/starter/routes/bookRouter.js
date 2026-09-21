const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookControllers');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.get('/', getAllBooks);
router.get('/:bookId', getBookById);

router.use(requireAuth);

router.post('/', createBook);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);

module.exports = router;
