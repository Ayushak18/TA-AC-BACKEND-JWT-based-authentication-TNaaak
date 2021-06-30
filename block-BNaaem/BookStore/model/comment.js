let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
  comment: String,
  bookId: { type: Schema.Types.ObjectId, ref: 'book' },
});

let Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
