//const ProductManager = require('../controller/productManager');
//const productManager = new ProductManager();

const express = require('express');
const router = express.Router();
const io = require('../app')
const productosModel = require('../dao/models/productos.model');
const { mongoose } = require('mongoose');
const { getAllProducts, deleteProduct, getProductsById, createProduct, updateProduct } = require('../controller/products.controller')


router.get('/', getAllProducts)//show all products data.
router.get('/:id', getProductsById)//show produtc with select ID.
router.post('/', createProduct)//creared a new product
router.put('/:pid', updateProduct)
router.delete('/:id', deleteProduct) //delete product

//update products
router.put('/:pid', async (req, res) => {
    let { pid } = req.params
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        res.setHeader('Content-type', 'application/json')
        return res.status(400).json({ error: "Ivalid ID" })
    }

    let exist
    try {
        exist = await productosModel.findOne({ _id: pid })
        const productId = parseInt(req.params.pid);
        const updates = req.body;


    } catch (error) {
        res.status(500).json({ error: "Error de servidor!" });
    }

    if (!exist) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No existen usuarios con id ${pid}` })
    }

    if (req.body._id || req.body.code) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No se pueden modificar la propiedades "_id" y "code"` })
    }

    let updateProd

    try {
        updateProd = await productosModel.updateOne({ _id: pid }, req.body)
        if (updateProd.modifiedCount > 0) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(200).json({ payload: 'change sucessfull' })
        } else {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ payload: 'change failed' })
        }
    } catch (error) {

    }


})


module.exports = router;