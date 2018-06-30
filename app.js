var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://tercou1:7Plus3=100@cluster0-shard-00-00-awlxk.mongodb.net:27017,cluster0-shard-00-01-awlxk.mongodb.net:27017,cluster0-shard-00-02-awlxk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
// MongoClient.connect(uri, function(err, db) {
//     // useNewUrlParser: true;
//     // db.close();
// });


var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function (req, res) {
        var book = new Book(req.body);

        book.save(book);
        res.status(201).send(book);
    })
    .get(function (req, res) {
        var query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) { //callback
            if(err) {
                console.log(err);
                res.status(500).send(err)
            }
            else {
                res.json(books);
            }
        });
    });

bookRouter.route('/Books/:bookId')
    // .post(function (req, res) {
    //     var book = new Book(req.body);
    //
    //     book.save(book);
    //     res.status(201).send(book);
    // })
    .get(function (req, res) {

        Book.findById(req.params.bookId, function (err, book) { //callback
            if(err) {
                console.log(err);
                res.status(500).send(err)
            }
            else {
                res.json(book);
            }
        });
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API!')
});

app.listen(port, function () {
    console.log('Gulp is running on port:' + port);
});