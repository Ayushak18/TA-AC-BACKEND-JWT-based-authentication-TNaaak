let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.password) {
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
      if (error) {
        next(error);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result);
  });
};

userSchema.methods.signToken = async function () {
  let payload = { userId: this.id, email: this.email };

  let token = await jwt.sign(payload, 'thisIsSecretWeAreGoingToUse');

  return token;
};

let User = mongoose.model('user', userSchema);

module.exports = User;
