const { validationResult } = require('express-validator/check');

const Room = require('../models/room');


exports.getAddRoom = (req, res, next) => {
  res.render('stock/edit-room', {
    pageTitle: 'Add room',
    path: '/add-room',
    sto: ["تبارك", "الاقيانوس"],
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
  console.log(total + "lklklklklklklklklklklk");
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
      console.log('Created Room');
      // res.redirect('rooms');
      return result;
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditRoom = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.roomId;
  Room.findById(prodId)
    .then(room => {
      if (!room) {
        return res.redirect('/');
      }
      res.render('stock/edit-room', {
        pageTitle: 'Edit Room',
        path: '/edit-room',
        sto: ["تبارك", "الاقيانوس"],
        editing: editMode,
        room: room,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditRoom = (req, res, next) => {
  const prodId = req.body.roomId;
  const updatedTitle = req.body.roomNO;
  const updatedPrice = req.body.total;
  const updatedDesc = req.body.stock;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('stock/edit-room', {
      pageTitle: 'Edit Room',
      path: '/edit-room',
      editing: true,
      hasError: true,
      room: {
        roomNO: updatedTitle,
        total: updatedPrice,
        stock: updatedDesc,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Room.findById(prodId)
    .then(room => {
      // if (room.userId.toString() !== req.user._id.toString()) {
      //   return res.redirect('/');
      // }
      room.roomNO = updatedTitle;
      room.total = updatedPrice;
      room.stock = updatedDesc;
      return room.save().then(result => {
        console.log('UPDATED PRODUCT!');

        res.redirect('/rooms');
      });
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

exports.postDeleteRoom = (req, res, next) => {
  const prodId = req.body.roomId;
  Room.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/rooms');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getIndex = (req, res, next) => {
//   Product.find()
//     .then(products => {
//       res.render('stcok/index', {
//         prods: products,
//         pageTitle: 'العملاء',
//         path: '/'
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

/////  Custmor


