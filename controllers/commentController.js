const db = require('../models/db.js');

const Comment = require('../models/CommentModel.js');

const User = require('../models/UserModel.js');

const commentController = {
	
	getIndex: function(req, res) {
        // your code here
        
		db.findMany (Comment, {}, null, function(loaddb){
			if(loaddb)
				res.render('/', {commentsdb: loaddb}); // This is to load the page initially
		})
    },
	
	getDelete: function (req, res) {
		db.deleteOne(Comment, req.query, (goodbye) => {});
    },
	
	getCheckNo: function (req, res) {

        var number = req.query.number;

        db.findOne(User, {number: number}, 'number', function (result) {
            res.send(result);
        });
    },
	
	getCheckUname: function (req, res) {

        var username = req.query.username;

        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    },
	
	addComment: function(req, res) {
        // your code here
		db.insertOne (Comment, req.query, 
		(getaddhtml) => {
			if(getaddhtml){
				res.render('./partials/comment', req.query, (err,html) => res.send(html));
			}
		})
    }
}

module.exports = commentController;