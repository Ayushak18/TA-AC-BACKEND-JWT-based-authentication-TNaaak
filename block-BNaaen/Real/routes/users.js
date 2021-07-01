var express = require('express');
var router = express.Router();
let User = require('../model/user');
let auth = require('../middleware/auth');

/* GET users listing. */

// Current User
router.get('/', auth.verifyToken, function (req, res, next) {
  let id = req.user.userId;
  User.findById(id, (error, currentUser) => {
    if (error) {
      next(error);
    } else {
      res.send(currentUser);
    }
  });
});

// Registration of user
router.post('/', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.json({ user: user });
    }
  });
});

// Login of the user
router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (email && password) {
    User.findOne({ email }, (error, user) => {
      if (error) {
        next(error);
      } else {
        if (user) {
          user.verifyPass(password, async (error, result) => {
            if (error) {
              next(error);
            } else {
              if (result) {
                let token = await user.signToken();
                res.json({ message: 'Password Matched', token: token });
              } else {
                res.send('Password Incorrect');
              }
            }
          });
        } else {
          res.send('User is not registered');
        }
      }
    });
  } else {
    res.send('Please enter email and password');
  }
});

// Updating user
router.put('/', auth.verifyToken, (req, res, next) => {
  let id = req.user.userId;
  User.findByIdAndUpdate(id, req.body, { new: true }, (error, updatedUser) => {
    if (error) {
      next(error);
    } else {
      res.send(updatedUser);
    }
  });
});

// Find user using username
router.get('/profiles/:username', (req, res, next) => {
  let username = req.params.username;
  User.findOne({ username }, (error, userProfile) => {
    if (error) {
      next(error);
    } else {
      res.send(userProfile);
    }
  });
});

module.exports = router;
