//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(`OBJ: ${obj}`);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log("We're in!");

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err){
            return console.log('Oops. Error inserting data!', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

    });

   db.collection('Users').insertOne({
        name: 'Reuben Cleetus',
        age: 40,
        location: 'Falls Church, VA'
    }, (err, result) => {
        if(err){
            return console.log('Oops. Error inserting data!', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

    });

    db.close();
});
