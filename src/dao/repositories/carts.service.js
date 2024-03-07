const cartsModel = require('../models/carts.model');

class CartsDAO{
    async create(){
        try {
            return await cartsModel.create({products:[]})
        } catch (error) {
            console.log(error.message)
            return null
            
        }
    }


    async getById(id){
        try {
            return await cartsModel.findOne({_id:id})
        } catch (error) {
            console.log(error.message)
            return null
            
        }

    }

    async update(id, cart){
        try {
            return await cartsModel.updateOne({_id:id}, cart)
        } catch (error) {
            console.log(error.message)
            return null
            
        }

    }

    async deleteAll(){
        try {
            return await cartsModel.deleteMany({})
        } catch (error) {
            console.log(error.message)
            
        }
    }
}



class Carts {
    constructor() {        

    }

    get = async () => {
        let getCarts = await cartsModel.find({})
        return getCarts

    }

    getById = async (cartId) => {
        let getcartsById = await cartsModel.findOne({_id:cartId})
        return  getcartsById

    }

    put = async (cartId, cart) =>{
        let updateCart = await cartsModel.updateOne({_id:cartId, cart})
        return  updateCart

    }

    post = async()=>{
        let createCarts = await cartsModel.create()

        return createCarts
    }

    delete = async(id)=>{
        let deleteCart = await cartsModel.deleteOne({_id:id})
        return deleteCart

    }

}

module.exports = {Carts, CartsDAO}