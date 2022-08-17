const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomNO: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Room', roomSchema);