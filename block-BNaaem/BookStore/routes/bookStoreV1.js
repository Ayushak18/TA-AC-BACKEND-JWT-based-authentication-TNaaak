var express = require('express');
var router = express.Router();
let Book = require('../model/book');

// List of all books
router.get('/', function (req, res, next) {
  Book.find({}, (error, books) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(books);
    }
  });
});

// To Create a book
router.post('/', (req, res, next) => {
  Book.create(req.body, (error, book) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(book);
    }
  });
});

// Single book
router.get('/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findById(bookId, (error, book) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(book);
    }
  });
});

// Update a book
router.put('/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findByIdAndUpdate(bookId, req.body, { new: true }, (error, book) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(book);
    }
  });
});

// To delete a book
router.delete('/:id', (req, res) => {
  let bookId = req.params.id;
  Book.findByIdAndRemove(bookId, (error, book) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(book);
    }
  });
});

module.exports = router;
