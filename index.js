const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
let books;

fs.readFile('data.json', (err, data) => {
    if (err) console.error(`Error while reading file ${err}`);
    else {
        books = JSON.parse(data);
    }
})
let Validator = require('jsonschema').Validator;
let v = new Validator();

let schema = require('./book.json');

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/api/books', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err)
            console.log(`Error while writing file in post ${error}`)
        else {
            books = JSON.parse(data);
            res.send(books);
        }

    })
})

function validatetherequest(req, res, next) {
    try {
        const book = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author
        }
        v.validate(book, schema, { throwError: true })
        next();
    } catch (error) {
        res.status(404).send("Bad Request " + error);
        return
    }
}

app.post('/api/books', validatetherequest, function(req, res) {
    const book = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author
    };
    books.push(book);
    fs.writeFile('data.json', JSON.stringify(books), (error) => {
        if (error)
            console.log(`Error while writing file in post ${error}`)
        else
            res.send(book);
    })
})

app.put('/api/books/:id', function(req, res) {
    const id = req.params.id;
    for (var i = 0; i < books.length; i++) {
        if (id == books[i].id) {
            books[i].title = req.body.title;
            books[i].description = req.body.description;
            books[i].author = req.body.author;
            let sendbook = books[i];
            fs.writeFile('data.json', JSON.stringify(books), (error) => {
                if (error)
                    console.log(`Error while writing file in post ${error}`)
                else
                    res.send(sendbook);
            })
            flag = false;
        }
    }
    if (flag == true) {
        res.status(404).send('Invlaid id not found');
    }
})

app.delete('/api/books/:id', function(req, res) {
    let flag = true;
    const id = req.params.id;
    for (var i = 0; i < books.length; i++) {
        if (id == books[i].id) {
            let sendbook = books[i];
            books.splice(i, 1);
            fs.writeFile('data.json', JSON.stringify(books), (error) => {
                if (error)
                    console.log(`Error while writing file in post ${error}`)
                else
                    res.send(sendbook);

            })
            flag = false;
        }
    }
    if (flag == true) {
        res.status(404).send('Invlaid id not found');
    }

})