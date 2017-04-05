
/**
 * Created by reuben on 4/1/17.
 */

/*Heroku */
var env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var app = express();
app.use(bodyParser.json());

//Set up databases
if(env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp_Test';
}

console.log(`----------- DB: ${process.env.MONGODB_URI}-------------`);


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

//GET
app.get('/todos',(req, res) => {
    "use strict";
    Todo.find().then((todos) => {
        res.send({todos, code: 'Sent!'});
    }, (e) => {
        res.status(400).send(e);
    })
});


app.patch('/todos/:id', (req, res) => {
    "use strict";
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);

   if(! ObjectID.isValid(id)) {
        res.status(400).send(`Invalid ID: ${id}`);
        return;
   }

   if(_.isBoolean(body.completed) && body.completed) {
       body.completedAt = new Date().getTime();
   } else {
        body.completed = false;
        body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
       if(!todo) {
           return response.status(404).send('Error updating todo');
       }
       response.send({todo});

   }).catch((e) => {
       res.status(400).send(e);
   });

});

/*
//Post/{id}/{todo}
app.post('/todos/:id/',(req,res) => {
    "use strict";
    var todo = Todo.findById(req.params.id);
    var update = req.body.uTodo;

    todo.text = update.text;
    todo.completed = update.completed;
    todo.completedAt = update.completedAt;
    todo.update().then((todo) => {
        res.send({todo});
    }, (e) => {
        res.status(400).send({todo, error_code: e})
    })
});
*/

//Remove
//DEL/id
app.delete('/todos/:id', (req, res) => {
    "use strict";
   var id = req.params.id;
    if(! ObjectID.isValid(id)) {
        res.status(400).send(`Invalid ID: ${id}`);
        return;
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        res.send(todo);
        console.log(`Deleted ID: ${id}`);
    }, (err) => {
        res.status(400).send({todo, error_code:err});
        console.log('Error deleting Todo Item');
    });
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
        console.log('Wrote it!');
   }, (e) => {
        res.status(400).send({todo, error_code:'404'});
        console.log('Error!!');
   });

});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
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

/*
module.exports = {app};
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
        console.log('Unable to append to server log');
    }
    });
    next();
});



app.use(express.static(__dirname + '/public/'));

hbs.registerHelper('screamIt', (textToScream) => {
    return textToScream.toUpperCase()
});

app.get('/', (req, res) => {
    //res.send(`<h2>Hello World, from Express!!</h2>`);
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        currentYear: new Date().toString(),
        welcomeMessage: `Welcome to this website, hope you like it!`
    })
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to respond.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
*/