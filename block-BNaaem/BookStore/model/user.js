let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let jwt = require('jsonwebtoken');

let userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.methods.signToken = async function () {
  let payload = { userId: this.id, email: this.email };
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
