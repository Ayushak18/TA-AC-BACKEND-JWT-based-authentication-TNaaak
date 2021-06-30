var express = require('express');
var router = express.Router();
let Book = require('../model/book');
let Comment = require('../model/comment');
let auth = require('../middleware/auth');

// List of all books
router.get('/', function (req, res, next) {
  Book.find({})
    .populate('comment')
    .exec((error, books) => {
      if (error) {
        next(error);
      } else {
        res.status(200).json(books);
      }
    });
});

// To Create a book
router.post('/', (req, res, next) => {
  if (req.headers.authorization) {
    Book.create(req.body, (error, book) => {
      if (error) {
        next(error);
      } else {
        res.status(200).json(book);
      }
    });
  } else {
    res.send('Please Log In');
  }
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
router.put('/:id', auth.verifyToken, (req, res, next) => {
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

// To create a comment
router.post('/:bookId/comments', (req, res, next) => {
  let bookId = req.params.bookId;
  req.body.bookId = bookId;
  Comment.create(req.body, (error, comment) => {
    if (error) {
      next(error);
    } else {
      Book.findByIdAndUpdate(
        bookId,
        { $push: { comment: comment.id } },
        { new: true },
        (error, book) => {
          if (error) {
            next(error);
          } else {
            res.status(200).json(book);
          }
        }
      );
    }
  });
});

// To edit and update comment
router.put('/:id/comment', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, { new: true }, (error, comment) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(comment);
    }
  });
});

// To delete a comment
router.delete('/:id/comment', (req, res, next) => {
  let id = req.params.id;
  Comment.findOneAndRemove(id, (error, comment) => {
    if (error) {
      next(error);
    } else {
      Book.findByIdAndUpdate(
        comment.bookId,
        { $pull: { comment: comment._id } },
        { new: true },
        (error, book) => {
          if (error) {
            next(error);
          } else {
            res.status(200).json(comment);
            // res.status(200).json(comment);
          }
        }
      );
    }
  });
});

module.exports = router;
