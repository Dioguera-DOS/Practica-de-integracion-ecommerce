const productosModel = require('../models/productos.model');

class Product {
    constructor() {        

    }

    get = async (page) => {
        let getProducts = await productosModel.paginate({}, { lean: true, limit: 5, page: page })
        return getProducts

    }

    getById = async (id) => {
        let getProductsById = await productosModel.findOne({_id:id})
        return  getProductsById

    }

    post = async(productData)=>{
        let createProduct = await productosModel.create(productData)

        return createProduct
    }

    delete = async(id)=>{
        let updateProduct = await productosModel.deleteOne({_id:id})
        return updateProduct

    }

}

module.exports = Product