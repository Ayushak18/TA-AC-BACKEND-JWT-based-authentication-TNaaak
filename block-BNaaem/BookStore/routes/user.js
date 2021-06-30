let express = require('express');
let router = express.Router();
let User = require('../model/user');

// /api/users

// Index router for user
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'In the user section' });
});

// To create a user
router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.status(201).json({ message: 'User created' });
    }
  });
});

// Login user

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
            // req.headers.authorization = token;
            res.status(201).json({ message: 'User Logged In', token });
          } else {
            res.status(201).json({ message: 'Password Incorrect' });
          }
        } else {
          res.status(201).json({ message: 'User not register' });
        }
      }
    });
  } else {
    res.json({ message: 'Please email and password' });
  }
});

module.exports = router;
