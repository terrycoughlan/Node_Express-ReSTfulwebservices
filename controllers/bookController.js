var bookController = function (Book) { //revealing module pattern
    var post = function (req, res) {
        var book = new Book(req.body);

        if(!req.body.title) {
            res.status(400);
            res.send('Title is required!');
        } else {
            book.save(book);
            res.status(201);
            res.send(book);
        }
    };

    var get = function (req, res) {
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
    };
    return { //return back the functions to expose to the outside world!
        post: post,
        get: get
    }
};

module.exports = bookController;