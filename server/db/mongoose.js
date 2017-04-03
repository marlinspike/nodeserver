/**
 * Created by reuben on 4/2/17.
 */
var mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};