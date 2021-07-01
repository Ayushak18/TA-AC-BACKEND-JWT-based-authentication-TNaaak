let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
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

userSchema.methods.verifyPass = function (password, cb) {
  bcrypt.compare(password, this.password, (error, result) => {
    return cb(error, result);
  });
};

userSchema.methods.signToken = async function () {
  let payload = { userId: this.id };

  try {
    let token = await jwt.sign(payload, 'Secret');
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

let User = mongoose.model('user', userSchema);

module.exports = User;
