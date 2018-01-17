const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to server');
    }
    console.log('Connected to MongoDb');

    db.collection('todo').insertOne({
        text: 'Something to do',
        completed: false
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert todo', error);
        }

        console.log('todo inserted.', JSON.stringify(result, undefined, 2));
    });

    db.close();
});