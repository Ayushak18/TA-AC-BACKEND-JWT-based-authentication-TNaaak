let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let jwt = require('jsonwebtoken');

let userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.methods.signToken = async function () {
  let payload = { userId: this.id, email: this.email };

  try {
    let token = await jwt.sign(payload, 'ANewSecret');
    return token;
  } catch (error) {
    return console.log(error);
  }
};

let User = mongoose.model('user', userSchema);

module.exports = User;
