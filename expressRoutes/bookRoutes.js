// bookRoutes.js

var express = require('express');
var bookRoutes = express.Router();

// Require Item model in our routes module
var Book = require('../models/Book');

// Defined store route
bookRoutes.route('/add').post(function (req, res) {
  var book = new Book(req.body);
   book.save()
    .then(item => {
    res.status(200).json({'book': 'Book added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
bookRoutes.route('/').get(function (req, res) {
   Book.find(function (err, books){
    if(err){
      console.log(err);
    }
    else {
      res.json(books);
    }
  });
});

// Defined edit route
bookRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  console.log(id);

  Book.findById(id, function (err, book){
      res.json(book);
  });
});

//  Defined update route
bookRoutes.route('/update/:id').post(function (req, res) {
   Book.findById(req.params.id, function(err, book) {
    if (!book)
      return next(new Error('Could not load Document'));
    else {
      book.key = req.body.key;

      book.name = req.body.name;
      book.author = req.body.author;
      book.category = req.body.category;
      book.price = req.body.price;
      book.status = req.body.status;
      book.url = req.body.url;
      book.file = req.body.file;

     
      book.save().then(book => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
bookRoutes.route('/delete/:id').get(function (req, res) {
   Book.findByIdAndRemove({_id: req.params.id}, function(err, book){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = bookRoutes;
