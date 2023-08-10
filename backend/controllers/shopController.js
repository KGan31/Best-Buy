const Item = require('../models/itemModel')
const Sold_Item = require('../models/soldItemModel')
const Cart = require('../models/cartModel')
const mongoose = require('mongoose')

// Get All Ttems
const getItems = async(req, res) => {
    const allItems = await Item.find({}).sort({createdAt: -1})
    if(allItems.length==0){
        return res.status(400).json({error:"Seems like we are currently out of stock. Please check again later"})
    }
    return res.status(200).json(allItems)
}

// Get Single Item
const getItem = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Item getItem"})
    }
    const singleItem = await Item.findById(id);
    if(singleItem==null){
        return res.status(404).json({error: "No such Item getItem"})
    } 
    return res.status(200).json(singleItem)
}

// Create Item
const createItem = async(req, res) => {
    const {title, description, price} = req.body
    const image = req.file.path;
    var emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(!image){
        emptyFields.push('image')
    }
    if(emptyFields.length>0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }
    try{
        const user_id = req.user._id;
        console.log(req.user);
        const item = await Item.create({title, description, price, image, user_id})
        console.log(item)
        if(item==null){
            return res.status(400).json({error: "Failed to add Item"})
        }
        return res.status(200).json(item)
    } catch(error){
        return res.status(400).json({error: error.message})
    }
}

// Delete Item
const deleteItem = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Item"})
    }
    const item = await Item.findOneAndDelete({_id: id}) 
    const cartItems = await Cart.deleteMany({item_id: id})
    if(item==null){
        return res.status(400).json({error: "Item Is Sold"})
    }
    return res.status(200).json(item);
}

// Update Item
const updateItem = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Item"})
    }
    const item = await Item.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    if(!item){
        return res.status(400).json({error: "No such Item"})
    }
    return res.status(200).json(item)
}

// get items that user posted
const sales = async(req, res) => {
    const user_id = req.user._id;
    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(404).json({error: "No such User"})
    }
    const sales = await Item.find({user_id}).sort({createdAt: -1})
    if(sales.length==0){
        return res.status(400).json({error: "No items are listed by you"})
    }
    return res.status(200).json(sales)
}
const sold = async(req, res) => {
    const seller_user_id = req.user._id;
    if(!mongoose.Types.ObjectId.isValid(seller_user_id)){
        return res.status(404).json({error: "No such User"})
    }
    const sold = await Sold_Item.find({seller_user_id}).sort({createdAt: -1})
    if(sold.length==0){
        return res.status(400).json({error: "No items are listed by you"})
    }
    return res.status(200).json(sold)
}


const orders = async(req, res) => {
    const buyer_user_id = req.user._id;
    if(!mongoose.Types.ObjectId.isValid(buyer_user_id)){
        return res.status(404).json({error: "No such User"})
    }
    const sales = await Sold_Item.find({buyer_user_id}).sort({createdAt: -1})
    console.log(sales)
    if(sales.length==0){
        return res.status(400).json({error: "No items bought"})
    }
    return res.status(200).json(sales)
}

const getSoldItem = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Item getItem"})
    }
    const singleItem = await Sold_Item.findById(id);
    if(singleItem==null){
        return res.status(404).json({error: "No such Item getItem"})
    } 
    return res.status(200).json(singleItem)
}

module.exports = {
    getItem,
    getItems,
    createItem,
    deleteItem,
    updateItem,
    sales,
    orders,
    sold,
    getSoldItem
}