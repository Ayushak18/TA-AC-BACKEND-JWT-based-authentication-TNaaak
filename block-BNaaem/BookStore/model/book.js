let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: String,
  author: String,
  comment: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
});

let Book = mongoose.model('book', bookSchema);

module.exports = Book;
