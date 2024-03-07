// const CartsManager = require('../dao/managers/cartsManager');
// const cartsManager = new CartsManager();
const cartsModel = require('../dao/models/carts.model');
const { Router } = require('express');
const router = Router();
const {createCarts,addProdTocart, getcartsById} = require('../controller/carts.controller');//getCartsId//getAllCarts

router.get('/:cid', getcartsById);



// get all carts registred
// router.get('/', getAllCarts);

//get carts by ID.
router.get('/:cid', getcartsById);

//create a cats
router.post('/', createCarts);

//add product to cart
router.post('/:cid/product/:pid', addProdTocart);

module.exports = router