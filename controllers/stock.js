const { validationResult } = require('express-validator/check');

const Room = require('../models/room');


exports.getAddRoom = (req, res, next) => {
  res.render('stock/edit-room', {
    pageTitle: 'Add room',
    path: '/add-room',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddRoom = (req, res, next) => {
  const roomNO = req.body.roomNO;
  const total = req.body.total;
  const stock = req.body.stock;
  const errors = validationResult(req);
  console.log(total + "   lklklklklklklklklklklk");
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('stock/edit-room', {
      pageTitle: 'Add room',
      path: '/add-room',
      editing: false,
      hasError: true,
      room: {
        roomNO: roomNO,
        total: total,
        stock: stock,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const room = new Room({
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    roomNO: roomNO,
    stock: stock,
    total: total,
  });
  room
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('rooms');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getRooms = (req, res, next) => {
  Room.find()
    .then(rooms => {
      console.log(rooms);
      res.render('stock/room-list', {
        sto: rooms,
        pageTitle: 'All Rooms',
        path: '/rooms'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
