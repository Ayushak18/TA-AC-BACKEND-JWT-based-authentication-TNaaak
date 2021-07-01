let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: String,
  description: String,
  body: String,
  tag: [String],
});

let Article = mongoose.model('article', articleSchema);

module.exports = Article;
