//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(`OBJ: ${obj}`);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log("We're in!");

/*    db.collection('Todos').find({
        _id: new ObjectID('58ddb97abc3bea2deaa019b7')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch Todos", err);
    });*/

    db.collection('Users').count().then((count) => {
        console.log(`There are ${count} records`);
    });

    var iterations = 0;
    var cursor = db.collection('Users').find();
    cursor.forEach((doc) => {
        iterations ++;
        console.log(`Iteration ${iterations} - Found: ${doc.name}`);
    }, (err) => {
        console.log(`Error iterating`, err);
    });

    //db.close();
});
