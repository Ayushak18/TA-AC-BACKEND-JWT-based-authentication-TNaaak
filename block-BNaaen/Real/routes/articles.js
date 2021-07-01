let express = require('express');
let router = express.Router();
let Articles = require('../model/article');

// All Articles
router.get('/', (req, res, next) => {
  Articles.find({}, (error, articles) => {
    if (error) {
      next(error);
    } else {
      res.send(articles);
    }
  });
});

// Create an article
router.post('/', (req, res, next) => {
  Articles.create(
    {
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      tag: req.body.tag,
    },
    (error, article) => {
      if (error) {
        next(error);
      } else {
        res.send(article);
      }
    }
  );
});

// Update an Article

router.put('/:id', (req, res, next) => {
  let id = req.user.userId;
  Articles.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (error, updatedArticles) => {
      if (error) {
        next(error);
      } else {
        res.send(updatedArticles);
      }
    }
  );
});

//
module.exports = router;
