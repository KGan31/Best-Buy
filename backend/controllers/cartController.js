const Cart = require('../models/cartModel')
const Item = require('../models/itemModel')
const mongoose = require('mongoose')

const getItems = async(req, res) => {
    const user_id = req.user._id;
    const allItems = await Cart.find({user_id}).sort({createdAt: -1});
    const ids = [];
    var i;
    allItems.map((item)=> (
        ids.push(item.item_id)
    ))   
        console.log(ids)
    //console.log(allItems);
    const cartItems = await Item.find({_id: {$in: ids}})
    res.status(200).json(cartItems);
}

const createItem = async(req, res) => {
    const user_id = req.user._id;
    const {id: item_id} = req.params;
    const cartItem = await Cart.create({user_id, item_id});
    res.status(200).json(cartItem);
}

const deleteItem = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Item"})
    }
    const cartItem = await Cart.findOneAndDelete({_id: id}) 
    if(!cartItem){
        return res.status(400).json({error: "No such Item"})
    }
    res.status(200).json(cartItem);
}

module.exports = {
    getItems, 
    deleteItem, 
    createItem
}