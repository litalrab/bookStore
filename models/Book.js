var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Book = new Schema({
  key: {
    type: String
  },
  name: {
    type: String
  },
  author: {
    type: String
  },
  category: {
    type: String
  },

  price: {
    type: Number
  },
  status: {
    type: String
  },
  url: {
    type: String
  },
  file: {
    type: File
  }
},{
    collection: 'books'
});

module.exports = mongoose.model('Book', Book);