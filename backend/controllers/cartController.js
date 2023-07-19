const Cart = require('../models/cartModel')
const Item = require('../models/itemModel')
const Sold_Item = require('../models/soldItemModel')
const mongoose = require('mongoose')

const getItems = async(req, res) => {
    const user_id = req.user._id;
    const allItems = await Cart.find({user_id}).sort({createdAt: -1});
    const ids = [];
    var i;
    allItems.map((item)=> (
        ids.push(item.item_id)
    ))   
        //console.log(ids)
    console.log(allItems);
    //console.log(req);
    const cartItems = await Item.find({_id: {$in: ids}})
    res.status(200).json(cartItems);
}

const createItem = async(req, res) => {
    const user_id = req.user._id;
    const {id: item_id} = req.params;
    const alreadyInCart = await Cart.findOne({user_id, item_id})
    console.log(alreadyInCart)
    if(alreadyInCart){
        return res.status(200).json({message: "Item is already added to cart"});
    }
    const cartItem = await Cart.create({user_id, item_id});
    return res.status(200).json(cartItem);
}

const deleteItem = async(req, res) => {
    const user_id = req.user._id;
    const {id: item_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(item_id)){
        return res.status(404).json({error: "No such Item"})
    }
    const cartItem = await Cart.findOneAndDelete({user_id, item_id}) 
    if(!cartItem){
        return res.status(400).json({error: "No such Item"})
    }
    return res.status(200).json(cartItem);
}

const checkoutItems = async(req, res) => {
    const del_ids = req.body;
    const buyer_user_id = req.user._id;
    del_ids.forEach(async (id)=>{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such Item"})
        }
        const cartItem = await Cart.deleteMany({item_id: id}) 
        if(!cartItem){
            return res.status(400).json({error: "No such Item"})
        }
        const item = await Item.findOneAndDelete({_id: id})
        if(!item){
            return res.status(400).json({error: "Failed to delete Item"})
        }
        const {title, description, price, image, user_id: seller_user_id} = item;
        const sold_item = await Sold_Item.create({title, description, price, image, seller_user_id, buyer_user_id})
        if(!sold_item){
            return res.status(400).json({error: "Failed to delete Item"})
        }
    })
    return res.status(200).json({message: 'Items deleted successfully'});
}

module.exports = {
    getItems, 
    deleteItem, 
    createItem,
    checkoutItems
}