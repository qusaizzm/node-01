const Op = require('../models/op');
const Room = require('../models/room');

const { validationResult } = require('express-validator/check');

exports.getAddOp = (req, res, next) => {

    // let queryObject = [{
    //     //description: "Object A",
    //     // $or: [{description: "Object D"}, {description: "Object B"}]
    //     $lookup: {
    //         from: "Opration",
    //         localField: "roomId",
    //         foreignField: "_id",
    //         as: "related_docs"
    //     }
    // }];

    // let cursor = Room.aggregate(queryObject);
    // cursor.toArray().then(roomss => {

    //     res.render('delly/edit-op', {
    //         rooms: roomss,
    //         sto: ["تبارك", "الاقيانوس"],
    //         pageTitle: 'Add Op',
    //         path: '/add-op',
    //         editing: false,
    //         hasError: false,
    //         errorMessage: null,
    //         validationErrors: []
    //     });
       

    // })
    //     .catch(err => {
    //         const error = new Error(err);
    //         error.httpStatusCode = 500;
    //         return next(error);
    //     });


    Room.find()
        .then(roomss => {
            // console.log(roomss);
            res.render('delly/edit-op', {
                rooms: roomss,
                sto: ["تبارك", "الاقيانوس"],
                pageTitle: 'Add Op',
                path: '/add-op',
                editing: false,
                hasError: false,
                errorMessage: null,
                validationErrors: []
            });
            console.log(sto);

        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });


};


exports.postAddOp = (req, res, next) => {
    const name = req.body.name;
    const total = req.body.total;
    // const mark = req.body.mark;
    // const room = req.body.room;
    // const optype = req.body.optype;
    const errors = validationResult(req);
    console.log(total + "lklklklklklklklklklklk");
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('delly/edit-op', {
            pageTitle: 'Add op',
            path: '/add-op',
            editing: false,
            hasError: true,
            op: {
                name: name,
                total: total,
                // mark: mark,
                // room: room,
                // optype: optype,
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const op = new Op({
        // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
        name: name,
        total: total,
        // room: room,
        // mark: mark,
        // optype: optype,
    });
    op
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Cus');
            res.redirect('custamss');

        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};


// exports.getEditOp = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//         return res.redirect('/');
//     }
//     const OpId = req.params.OpId;
//     Op.findById(OpId)
//         .then(Opm => {
//             if (!Opm) {
//                 return res.redirect('/');
//             }
//             res.render('stock/edit-Opm', {
//                 pageTitle: 'Edit Op',
//                 path: '/edit-Opm',
//                 editing: editMode,
//                 Opm: Opm,
//                 hasError: false,
//                 errorMessage: null,
//                 validationErrors: []
//             });
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         });
// };

// exports.postEditOp = (req, res, next) => {
//     const OpId = req.body.OpId;
//     const updatedName = req.body.name;
//     const updatedPhone = req.body.phone;
//     const updatedTotal = req.body.total;
//     const updatedRoom = req.body.room;
//     const updatedMark = req.body.mark;
//     const updatedDen = req.body.optype;

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).render('stock/edit-Opm', {
//             pageTitle: 'Edit Op',
//             path: '/edit-Opm',
//             editing: true,
//             hasError: true,
//             Opm: {
//                 name: updatedName,
//                 phone: updatedPhone,
//                 total: updatedTotal,
//                 room: updatedRoom,
//                 mark: updatedMark,
//                 den: updatedDen,
//                 _id: OpId
//             },
//             errorMessage: errors.array()[0].msg,
//             validationErrors: errors.array()
//         });
//     }

//     Op.findById(OpId)
//         .then(Opm => {
//             // if (Opm.userId.toString() !== req.user._id.toString()) {
//             //   return res.redirect('/');
//             // }

//             Opm.name = updatedName;
//             Opm.phone = updatedPhone;
//             Opm.total = updatedTotal;
//             Opm.room = updatedRoom;
//             Opm.mark = updatedMark;
//             Opm.den = updatedDen;
//             return Opm.save().then(result => {
//                 console.log('UPDATED PRODUCT!');

//                 res.redirect('/');
//             });
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         });
// };

// exports.getOps = (req, res, next) => {
//     Op.find()
//         .then(Optamss => {
//             console.log(Optamss);
//             res.render('stock/index', {
//                 sto: Optamss,
//                 pageTitle: 'All Ops',
//                 path: '/'
//             });
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         });
// };

// exports.postDeleteOp = (req, res, next) => {
//     const OpId = req.body.OpId;
//     // Op.deleteOne({ _id: OpId, userId: req.user._id })
//     Op.deleteOne({ _id: OpId })
//         .then(() => {
//             console.log('DESTROYED PRODUCT');
//             res.redirect('/');
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.httpStatusCode = 500;
//             return next(error);
//         });
// };

exports.getIndex = (req, res, next) => {
    Op.find()
        .then(oprations => {
            res.render('delly/in-stock', {
                sto: oprations,
                pageTitle: 'العمليات',
                path: '/op'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};