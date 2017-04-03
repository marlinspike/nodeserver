/**
 * Created by reuben on 4/1/17.
 */
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
app.use(bodyParser.json());

//POST
app.post('/todos',(req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });

});

//POST
app.get('/todos',(req, res) => {
    "use strict";
    Todo.find().then((todos) => {
        res.send({todos, code: 'Sent!'});
    }, (e) => {
        res.status(400).send(e);
    })
});


//Get Todo by ID
//GET /todos/1234
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(! ObjectID.isValid(id)) {
        res.status(400).send(`Invalid ID: ${id}`);
        return;
    }

   Todo.findById(id).then((todo) => {
        res.send({todo});

   }, (e) => {
        res.status(400).send({todo, error_code:'404'});

   });

});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});


/*
var u = new User();
u.first = "Reuben";
u.last = "Cleetus";
u.age = 40;
u.email = "rcleetus@gmail.com";

u.save().then ((doc) => {
    "use strict";
    console.log(`Saved user: ${doc}`);
    }, (e) => {
    "use strict";
    console.log((`Error saving user: ${e}`))
});


var item = new Todo();
item.text = "Finish 'Rogue One'";
//item.completed = false;
//item.completedAt = Date.now();

item.save().then((doc) => {
    "use strict";
    console.log(`Saved Item: ${doc}`);
    }, (e) => {
    "use strict";
    console.log(`Error saving item: ${e}`);
});

var item = mongoose.model('Todo');
item.find().byfirst('Reuben').exec((err, todoItem) => {
    console.log(todoItem);
});

*/

module.exports = {app};