var mongoose = require('mongoose');

/**
 * Created by reuben on 4/2/17.
 */
//Define model for User
var User = mongoose.model('User', {
    first: {
        type: String,
        required: true,
        trim:true,
        minlength: 2
    },
    last: {
        type: String,
        required: true,
        trim:true,
        minlength: 2
    },
    age: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        required: true,
        trim:true,
        minlength: 5
    }
});

module.exports = {
    User
};