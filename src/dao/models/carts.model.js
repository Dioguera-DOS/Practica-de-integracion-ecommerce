const mongoose = require("mongoose");

const cartsCollection = 'carts';
const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products"
                },
                quantity:Number
            }
        ]
    },

    {
        timestamps: true
    })


const cartsModel = mongoose.model(cartsCollection, cartSchema)
module.exports = cartsModel