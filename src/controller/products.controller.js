//const productosModel = require('../dao/models/productos.model');
const Product = require('../dao/repositories/products.service')
const mongoose = require('mongoose');
const products = new Product();

const {generateProducts} = require('../mock/mocks')


const getAllProducts = async (req, res) => { 


    let page = 1
    if (req.query.page) {
        page = req.query.page
    }
    let products_list
    try {
        products_list = await products.get(page)
        let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products_list 

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).render('products', {
            products: products_list.docs,
            totalPages, hasPrevPage, hasNextPage, prevPage, nextPage,
           

        });

        

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getProductsById = async (req, res) => {
    let { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) // verificar si ID es valido en MongoDB
    {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un ID con formato válido` })
    }

    let exist

    try {
        exist = await products.getById(id)
        //exist = await productosModel.findOne({ _id: id })
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error ineperado` })
    }

    if (!exist) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `user id ${req.params.id} not found` })

    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ product_details: exist })

}

const createProduct = async (req, res) => {
    const { title, description, price, code, stock, category, status } = req.body;

    //let mockProducts = generateProducts()

    //let {code, description, price, stock, title, category, status} = mockProducts

    try {

        const thumbnails = req.body.thumbnails || [];
        const requiredFields = ['title', 'description', 'price', 'code', 'stock', 'category'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan campos requeridos: ${missingFields.join(', ')}` });
        }

        const typeValidation = {
            title: 'string',
            description: 'string',
            price: 'number',
            code: 'string',
            stock: 'number',
            category: 'number',

        };

        const invalidFields = Object.entries(typeValidation).reduce((acc, [field, type]) => {
            if (req.body[field] !== undefined) {
                if (type === 'array' && !Array.isArray(req.body[field])) {
                    acc.push(field);
                } else if (typeof req.body[field] !== type) {
                    acc.push(field);
                }
            }
            return acc;
        }, []);

        if (!Array.isArray(thumbnails)) {
            return res.status(400).json({ error: 'Formato inválido para el campo thumbnails' });
        }

        if (invalidFields.length > 0) {
            return res.status(400).json({ error: `Tipos de datos inválidos en los campos: ${invalidFields.join(', ')}` });
        }

        const productData = {
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status: status !== undefined ? status : true
        };

        let newProd = await products.post(productData)

        const responseCodes = {
            "Ya existe un producto con ese código. No se agregó nada.": 400,
            "Producto agregado correctamente.": 201,
            "Error agregando producto.": 500,
        };

        //io.emit("producto", result)

        const reStatus = responseCodes[newProd] || 500;
        return res.status(reStatus).json({ status: reStatus, newProd });

    } catch (error) {
        return res.status(500).json(error.message);
    }

}


//HAY QUE CORREGIR ESE ENDPOINT
const updateProduct = async (req, res) => {
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
        return res.status(400).json({ error: `ID ya existe ${pid}` })
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

}

const deleteProduct = async (req, res) => {
    let { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Enter a valid ID!!!` })
    }
    let existe
    try {
        existe = await products.getById(id);
        //existe = await productosModel.findOne({ _id: id })
        console.log(existe)
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
    }

    if (!existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `ID ${id} not exist` })
    }


    let resultado
    try {
        resultado = await products.delete(id)
        //resultado = await productosModel.deleteOne({ _id: id })
        console.log(resultado)
        if (resultado.deletedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: "Eliminacion realizada" });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No se concretó la eliminacion` })
        }
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(error.message)

    }

}

module.exports = { getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct }