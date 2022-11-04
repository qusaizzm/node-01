const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const shopController = require('../controllers/stock');
const custmoController = require('../controllers/cusm');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
router.get('/', custmoController.getIndex);

router.get('/rooms', shopController.getRooms);

router.get('/add-room', isAuth, shopController.getAddRoom);
// /admin/add-room => POST
router.post('/add-room',
    [
        body('roomNO')
            .isString()
            .trim(),
        body('total'),
        body('stock').isString()
            .trim(),

    ],
    isAuth,
    shopController.postAddRoom
);
router.get('/edit-room/:roomId', isAuth, shopController.getEditRoom);

router.post('/edit-room',
    [
        body('name'),
        body('phone'),
        body('total')
    ],
    isAuth,
    shopController.postEditRoom
);
router.post('/delete-room', isAuth, shopController.postDeleteRoom);

// router.get('/rooms/:roomId', shopController.getProduct);

///

// router.get('/', custmoController.getIndex);

router.get('/add-cusm', isAuth, custmoController.getAddCus);

router.post('/add-cusm',
    [
        body('name')
            .isString()
            .trim(),
        body('phone'),
        body('total'),
        body('mark'),
        body('room'),
        body('den'),

    ],
    isAuth,
    custmoController.postAddCus
);
router.get('/edit-cusm/:cusmId', isAuth, custmoController.getEditCus);

router.post('/edit-cusm',
    [
        body('name')
            .isString()
            .trim(),
        body('phone'),
        body('total'),
        body('mark'),
        body('room'),
        body('den'),
    ],
    isAuth,
    custmoController.postEditCus
);

router.post('/delete-cusm', isAuth, custmoController.postDeleteCus);

module.exports = router;
