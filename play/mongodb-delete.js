//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(`OBJ: ${obj}`);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log("We're in!");

    //DeleteMany
    /*db.collection('Todos').deleteMany({text: 'Eat Dinner'}).then((result) => {
        console.log(result);
    });*/

    //DeleteOne
    //db.collection.deleteOne({})
    db.collection('Todos').deleteOne({_id: new ObjectID('58e014267917ad02699b9a70')}).then((result) => {
        "use strict";
        console.log(result);

    });

    //FindOneAndDelete
/*    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });*/


    //db.close()

});