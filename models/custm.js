const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: [{
    type: Number,
    required: true
  }],
  total: {
    type: Number,
    required: true
  },
  mark:[ {
    type: String,
    required: true
  }],
  room:[ {
    type: Number,
    required: true
  }],
  den: {
    type: Number,
    required: true
  },

});

module.exports = mongoose.model('Custmer', productSchema);
