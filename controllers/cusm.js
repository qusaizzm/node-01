const Cus = require('../models/custm');

const { validationResult } = require('express-validator/check');

exports.getAddCus = (req, res, next) => {
    res.render('stock/edit-cusm', {
        pageTitle: 'Add cusm',
        path: '/add-cusm',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

exports.postAddCus = (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const total = req.body.total;
    const room = req.body.room;
    const mark = req.body.mark;
    const den = req.body.den;
    const errors = validationResult(req);
    console.log(phone + "lklklklklklklklklklklk");
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('stock/edit-cusm', {
            pageTitle: 'Add cusm',
            path: '/add-cusm',
            editing: false,
            hasError: true,
            cusm: {
                name: name,
                phone: phone,
                total: total,
                room: room,
                mark: mark,
                den: den,
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const cusm = new Cus({
        // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
        name: name,
        total: total,
        phone: phone,
        room: room,
        mark: mark,
        den: den,
    });
    cusm
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

exports.getEditCus = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const cusmId = req.params.cusmId;
    Cus.findById(cusmId)
        .then(cusm => {
            if (!cusm) {
                return res.redirect('/');
            }
            res.render('stock/edit-cusm', {
                pageTitle: 'Edit Cus',
                path: '/edit-cusm',
                editing: editMode,
                cusm: cusm,
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

exports.postEditCus = (req, res, next) => {
    const cusmId = req.body.cusmId;
    const updatedName = req.body.name;
    const updatedPhone = req.body.phone;
    const updatedTotal = req.body.total;
    const updatedRoom = req.body.room;
    const updatedMark = req.body.mark;
    const updatedDen = req.body.den;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('stock/edit-cusm', {
            pageTitle: 'Edit Cus',
            path: '/edit-cusm',
            editing: true,
            hasError: true,
            cusm: {
                name: updatedName,
                phone: updatedPhone,
                total: updatedTotal,
                room: updatedRoom,
                mark: updatedMark,
                den: updatedDen,
                _id: cusmId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    Cus.findById(cusmId)
        .then(cusm => {
            // if (cusm.userId.toString() !== req.user._id.toString()) {
            //   return res.redirect('/');
            // }

            cusm.name = updatedName;
            cusm.phone = updatedPhone;
            cusm.total = updatedTotal;
            cusm.room = updatedRoom;
            cusm.mark = updatedMark;
            cusm.den = updatedDen;
            return cusm.save().then(result => {
                console.log('UPDATED PRODUCT!');

                res.redirect('/');
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getCuss = (req, res, next) => {
    Cus.find()
        .then(custamss => {
            console.log(custamss);
            res.render('stock/index', {
                sto: custamss,
                pageTitle: 'All Cuss',
                path: '/'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postDeleteCus = (req, res, next) => {
    const cusmId = req.body.cusmId;
    // Cus.deleteOne({ _id: cusmId, userId: req.user._id })
    Cus.deleteOne({ _id: cusmId })
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
exports.getIndex = (req, res, next) => {
    Cus.find()
        .then(custamss => {
            res.render('stock/index', {
                sto: custamss,
                pageTitle: 'العملاء',
                path: '/'
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};