const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Custmer',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  roomId: [{
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  }]
  // mark:[ {
  //   type: String,
  //   required: true
  // }],
  // room:[ {
  //   type: Number,
  //   required: true
  // }],
  // optype: {
  //   type: String,
  //   required: true
  // },
  // // optype: {
  // //   type: ,
  // //   required: true
  // // },
});

module.exports = mongoose.model('Opration', productSchema);
