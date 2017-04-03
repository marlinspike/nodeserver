/**
 * Created by reuben on 4/2/17.
 */
var mongoose = require("mongoose");

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim:true,
        minlength: 2
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};