const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

var todos = [{ text: 'Test todo 1' }, { text: 'Test todo 2' }];

beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done());
});

describe('POST requests to /todos', () => {
    it('should create a new note', (done) => {
        var todo = new Todo({ text: 'Test todo text' });
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(todo.text);
            })
            .end((error, res) => {
                if (error) {
                    return done(error);
                }

                Todo.find({ text })
                    .then((docs) => {
                        expect(docs.length).toBe(1);
                        expect(docs[0].text).toBe(todo.text);
                        done();
                    })
                    .catch(e => done(e));
            });
    });

    it('should not insert a todo with invalid body data', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error, result) => {
                if (error) done(error);

                Todo.find()
                    .then(docs => {
                        expect(docs.length).toBe(2);
                        done();
                    })
                    .catch(e => done(e));
            });
    });
});

describe('GET requests to /todos',()=>{
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

