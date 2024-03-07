const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productsCollection = 'products';
const productSchema = new mongoose.Schema(
{
    
    title: String,
    description: String,
    price: Number,
    thumbnails: Array,
    code: String,
    stock: Number,
    category: Number,
    status: Boolean

},
{
    timestamps: true
})

productSchema.plugin(mongoosePaginate);
const productosModel = mongoose.model(productsCollection, productSchema)
module.exports = productosModel