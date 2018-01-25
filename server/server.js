var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.status(200).send(doc);
    }, e => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find()
        .then(docs => {
            res.status(200).send({ todos: docs });
        })
        .catch(error => {
            res.status(400).send(error);
        })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findById(id)
        .then((todo) => {
            if (todo) {
                res.status(200).send(todo);
            } else {
                res.status(404).send();
            }
        })
        .catch(error => {
            res.status(500).send();
        });
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = { app };