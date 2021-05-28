var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	number: {type: Number, required: true},
    username: {type: String, required: true},
    comment: {type: String, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);
