var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    psw: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String, 
        required: true
    },
	address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);