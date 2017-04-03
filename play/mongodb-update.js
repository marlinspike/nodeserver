//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(`OBJ: ${obj}`);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log("We're in!");


    //DeleteOne
    //db.collection.deleteOne({})
  /*  db.collection('Todos').findOneAndUpdate(
    {

       text: 'Eat Dinner'}, {
        $set: { completed: true }}, {
        returnOriginal: false
    }). then((result) => {
        console.log(result);
    });*/

    var col = db.collection('Users');

    col.findOneAndUpdate(
        {
            _id: new ObjectID('58db1eb009ea670714515843')
        },
        {
            $inc: {age: 1 }
        }, {
        $set: {name: 'Reuben Cleetus'
        }
        }).then((result) => {
            console.log(result);
        });


    col.findOneAndUpdate
        ({_id: new ObjectID('58e0340e7917ad02699bab82')}
            ,
            {
                $inc: {age: 1}
                ,

                $set: {name: 'Eleonore Aubry'}
            },
            {   returnOriginal: false
            }
        ).then((result) => {
        "use strict";
            console.log(result);
        });
    db.close()

});