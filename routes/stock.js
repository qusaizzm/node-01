const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const shopController = require('../controllers/stock');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// router.get('/', shopController.getIndex);

router.get('/rooms', shopController.getRooms);

router.get('/add-room', isAuth, shopController.getAddRoom);
// /admin/add-room => POST
router.post(
    '/add-room',
    [
        body('roomNO')
            .isString()
            .trim(),
        body('total').isFloat(),
        body('stock').isString()
            .trim(),

    ],
    isAuth,
    shopController.postAddRoom
);
// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', isAuth, shopController.getCart);

// router.post('/cart', isAuth, shopController.postCart);

// router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// router.post('/create-order', isAuth, shopController.postOrder);

// router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;
