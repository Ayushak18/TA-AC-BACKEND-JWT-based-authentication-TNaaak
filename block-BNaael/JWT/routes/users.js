var express = require('express');
var router = express.Router();
let User = require('../model/user');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('In the user Section');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/users/login');
    }
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (email && password) {
    User.findOne({ email }, async (error, user) => {
      if (error) {
        next(error);
      } else {
        if (user) {
          if (user.password === password) {
            let token = await user.signToken();
            req.headers.authorization = token;
            return res.json({ user, token });

            // console.log(req.headers);
            // res.send('/users/protected');
          } else {
            res.send('Password incorrect');
          }
        } else {
          res.send('User not found');
        }
      }
    });
  } else {
    res.send('Please enter email and password');
  }
});

router.get('/protected', auth.verifyToken, (req, res, next) => {
  res.send('In the protected router');
});

module.exports = router;
