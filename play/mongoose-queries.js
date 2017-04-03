/**
 * Created by reuben on 4/3/17.
 */
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

//ObjectId("58e2643ef64dc9482e5d792a")

var id = '58e2643ef64dc9482e5d792a';

/*Todo.find({
    _id: id
}).then((todos) => {
    "use strict";
    console.log('Todos', todos);
    console.log('---------------');
});

Todo.findOne({
    _id: id
}).then((todo) => {
    "use strict";
    console.log(`Text: ${todo.text}`);
    console.log('Todos', todo);
    console.log('---------------');
});*/


if (! ObjectID.isValid(id)){
    console.log('Invalid Object ID: ', id);
    return;
}else {

    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log('ID Not found!');
        }
        "use strict";
        console.log(`Text: ${todo.text}`);
        console.log('Todos', todo);
        console.log('---------------');
    }).catch((e) => console.log(e));

}