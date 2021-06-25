const e = require('express');
var express = require('express');
var router = express.Router();
let User = require('../model/user');

// /api/v1/users

// To view all users
router.get('/', function (req, res, next) {
  User.find({}, (error, users) => {
    if (error) {
      next(error);
    } else {
      res
        .status(200)
        .json({ message: 'Welcome to login and register User portal' });
    }
  });
});

// To Create a user
router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.status(201).json({ message: 'User Registered Successfully' });
    }
  });
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error) {
      next(error);
    } else {
      if (email && password) {
        if (user) {
          user.verifyPassword(password, (error, result) => {
            if (error) {
              next(error);
            } else {
              if (result) {
                return res
                  .status(200)
                  .json({ message: 'User Logged In Successful ' });
              } else {
                return res.status(404).json({ message: 'Password Incorrect' });
              }
            }
          });
        } else {
          return res.status(404).json({ message: 'User not registered' });
        }
      } else {
        return res.status(404).json({ message: 'Email and Password is Empty' });
      }
    }
  });
});

module.exports = router;
