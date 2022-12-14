const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const custmoController = require('../controllers/op');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

///

router.get('/op', custmoController.getIndex);

router.get('/add-op', isAuth, custmoController.getAddOp);

router.get('/ops/:productId', custmoController.getItemByID);

router.post('/ops',
    [
        body('name')
            .isString()
            .trim(),
        body('total'),
        body('roomId'),
        // body('mark'),
        // body('room'),
        // body('optype'),

    ],
    isAuth,
    custmoController.postAddOpNewOpre
);
router.post('/add-op',
    [
        body('name')
            .isString()
            .trim(),
        body('total'),
        body('roomId'),
        // body('mark'),
        // body('room'),
        // body('optype'),

    ],
    isAuth,
    custmoController.postAddOp
);


router.post('/as-op',
    [
        body('name')
            .isString()
            .trim(),
        body('total'),
        body('roomId'),
        // body('mark'),
        // body('room'),
        // body('optype'),

    ],
    isAuth,
    custmoController.selectCusm
);
// router.get('/edit-cusm/:cusmId', isAuth, custmoController.getEditCus);

// router.post('/edit-cusm',
//     [
//         body('name')
//             .isString()
//             .trim(),
//         body('phone'),
//         body('total'),
//         body('mark'),
//         body('room'),
//         body('den'),
//     ],
//     isAuth,
//     custmoController.postEditCus
// );

router.post('/delete-op', isAuth, custmoController.postDeleteOp);

module.exports = router;
