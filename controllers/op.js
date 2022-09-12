const Op = require('../models/op');
const Room = require('../models/room');
const Cudd = require('../models/custm');

const { validationResult } = require('express-validator/check');
const { array } = require('assert-plus');
const { CopyDataProperties } = require('es-abstract/es2019');

exports.getAddOp = (req, res, next) => {
    const name = req.body.name;
    const stock = req.body.stock;

    Room.find()
        .then(roomss => {
            Cudd.find()
                .then(ccc => {
                    console.log("kkkkkkkkkkkkk " + name);


                    res.render('delly/edit-op', {
                        rooms: roomss,
                        cussjdds: ccc,
                        sto: ["تبارك", "الاقيانوس"],
                        pageTitle: 'Add Op',
                        path: '/add-op',
                        editing: false,
                        hasError: false,
                        errorMessage: null,
                        validationErrors: []
                    });
                    // console.log(roomss.roomsNO);

                })
                .catch(err => {
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error);
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

};


//// from custmer  view  
exports.getItemByID = (req, res, next) => {
    const stock = req.body.stock;

    const prodId = req.params.productId;
    Room.find()
        .then(roomss => {
            Cudd.findById(prodId)
                .then(moo => {
                    console.log(roomss.stock + "jjjjjjjjjjjjjj");

                    res.render('delly/get-op', {
                        rooms: roomss,
                        product: moo,
                        sto: ["تبارك", "الاقيانوس"],
                        pageTitle: moo.name,
                        path: '/ops',
                        editing: false,
                        hasError: false,
                        errorMessage: null,
                        validationErrors: []


                        // product: moo,
                        // pageTitle: moo.name,
                        // path: '/ops'
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error);
                });
        }).catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

};
exports.postAddOpNewOpre = (req, res, next) => {
    const nameID = req.body.nameID;
    const name = req.body.name;
    const total = req.body.total;
    const Oldtotal = req.body.Oldtotal;

    const room = req.body.roomId;

    // const optype = req.body.optype;

    const errors = validationResult(req);
    console.log([total, name, Oldtotal, nameID]);
    // console.log(room + " llll");
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('delly/get-op', {
            pageTitle: 'Add op',
            path: '/ops',
            editing: false,
            hasError: true,
            op: {
                name: nameID,
                total: total,
                roomId: room,

                // mark: mark,
                // optype: optype,
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }


    const op = new Op({
        // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
        name: nameID,
        total: total,
        roomId: room

        // room: room,
        // mark: mark,
        // optype: optype,
    });


    op
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Cus');
            res.redirect('op');

        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.selectCusm = (req, res, next) => {
    const name = req.body.name;
    const Oldtotal = req.body.Oldtotal;
    // const total = req.body.total;

    // const mark = req.body.roomId;
    const room = req.body.roomId;
    // const roogm = req.room._id;

    Cudd.findById(name)
        .then(ccc => {
            // console.log(ccc);
            console.log(ccc.name);
            // console.log(name);

            res.render('delly/edit-op', {
                cxcxcxcxc: ccc,
                path: '/add-op',
                editing: false,
                hasError: false,
                errorMessage: null,
                validationErrors: []
            });
            // console.log(roomss.roomsNO);

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
    const Oldtotal = req.body.Oldtotal;

    // const mark = req.body.roomId;
    const room = req.body.roomId;
    // const roogm = req.room._id;

    // const optype = req.body.optype;

    const errors = validationResult(req);
    // console.log(room + " llll");
    // console.log(  mark + " lklklklklklklklklklklk");
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
                // roomId: room,
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
        roomId: room

        // room: room,
        // mark: mark,
        // optype: optype,
    });
    Cudd.findById(name)
        .then(ccc => {
            console.log(ccc);
            console.log(name);
            console.log(name);

            // res.render('delly/edit-op', {
            //     rooms: roomss,
            //     cussjdds: ccc,
            //     sto: ["تبارك", "الاقيانوس"],
            //     pageTitle: 'Add Op',
            //     path: '/add-op',
            //     editing: false,
            //     hasError: false,
            //     errorMessage: null,
            //     validationErrors: []
            // });
            // console.log(roomss.roomsNO);

        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

    // op
    //     .save()
    //     .then(result => {
    //         // console.log(result);
    //         console.log('Created Cus');
    //         res.redirect('op');

    //     })
    //     .catch(err => {
    //         const error = new Error(err);
    //         error.httpStatusCode = 500;
    //         return next(error);
    //     });
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

exports.postDeleteOp = (req, res, next) => {
    const opId = req.body.opId;
    // Op.deleteOne({ _id: OpId, userId: req.user._id })
    Op.deleteOne({ _id: opId })
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/op');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getIndex = (req, res, next) => {

    // Cudd.find()
    //     .then(ccc => {
    //         console.log("kkkkkkkkkkkkk " + name);
    //         res.render('delly/in-srock', {
    //             cussjdds: ccc,
    //             errorMessage: null,
    //             validationErrors: []
    //         });
    //         // console.log(roomss.roomsNO);

    //     })
    //     .catch(err => {
    //         const error = new Error(err);
    //         error.httpStatusCode = 500;
    //         return next(error);
    //     });

    Op.find().populate('roomId').populate('name').exec().then((opp) => {
        // opp.forEach((ops) => {
        //     ops.roomId.forEach((ad) => {
        //         console.log({ hh, ad });
        //         hh = ad;

        //     })
        // }),

        res.render('delly/in-stock', {
            sto: opp,
            // roo: hh,
            pageTitle: 'العمليات',
            path: '/op'



        })

        // console.log({ hh, ccc });

        // })
        // })
    })
    // const hkjfy = [];
    // const kjkjkj = Room.find()
    //     .populate("_id")
    //     .then(
    //         ooo => {
    //             Op.find()
    //                 .then(oprations => {
    //                     if (oprations[0].roomId == [ooo[0]._id]) {
    //                         console.log("oprations[0].roomId")

    //                     }
    //                     else {
    //                         console.log(oprations[0].roomId)
    //                         console.log(ooo[0]._id)
    //                         console.log("")

    //                     }
    //                 })
    //             // for (var i = 0; i < ooo.length; i++) {
    //             //     if ()
    //             //         console.log(ooo[0]._id)
    //             // }
    //         }
    //     );
    // const kkkk = Op.findOne({ name: 'jhhjghjg' })
    //     .populate("roomId")

    //     // .then(oprations => {
    //     //     res.render('delly/in-stock', {
    //     //         sto: oprations,
    //     //         pageTitle: 'العمليات',
    //     //         path: '/op'
    //     //     });
    //     // })
    //     .catch(err => {
    //         const error = new Error(err);
    //         error.httpStatusCode = 500;
    //         return next(error);
    //     });
    // for (var i = 0; i < kjkjkj._id.length; i++) {
    //     console.log("ppppp ");

    // }
    // const kkkk = kjkjkj._id;

    // console.log("ppppp " + kjkjkj);

};