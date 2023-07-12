const Item = require('../models/itemModel')
const Sold_Item = require('../models/soldItemModel')
const mongoose = require('mongoose')
const upload = require('../middleware/upload')
// Get All Ttems
const getItems = async(req, res) => {
    const allItems = await Item.find({}).sort({createdAt: -1})
    res.status(200).json(allItems)
}

// Get Single Item
const getItem = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Item getItem"})
    }
    const singleItem = await Item.findById(id);
    if(!singleItem){
        return res.status(404).json({error: "No such Item getItem"})
    } 
    res.status(200).json(singleItem)
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
        res.status(200).json(item)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// Delete Item
const deleteItem = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Item"})
    }
    const item = await Item.findOneAndDelete({_id: id}) 
    if(!item){
        return res.status(400).json({error: "No such Item"})
    }
    const buyer_user_id = req.user._id;
    const {title, description, price, image, user_id: seller_user_id} = item;
    const sold_item = await Sold_Item.create({title, description, price, image, seller_user_id, buyer_user_id})
    res.status(200).json({message:'Files deleted successfully'});
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
    res.status(200).json(item)
}

// get items that user posted
const sales = async(req, res) => {
    const user_id = req.user._id;
    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(404).json({error: "No such User"})
    }
    const sales = await Item.find({user_id}).sort({createdAt: -1})
    console.log(sales);
    if(!sales){
        return res.status(400).json({error: "No items are listed by the user"})
    }
    res.status(200).json(sales)
}

const orders = async(req, res) => {
    const buyer_user_id = req.user._id;
    if(!mongoose.Types.ObjectId.isValid(buyer_user_id)){
        return res.status(404).json({error: "No such User"})
    }
    const sales = await Sold_Item.find({buyer_user_id}).sort({createdAt: -1})
    console.log(sales);
    if(!sales){
        return res.status(400).json({error: "No items are listed by the user"})
    }
    res.status(200).json(sales)
}

module.exports = {
    getItem,
    getItems,
    createItem,
    deleteItem,
    updateItem,
    sales,
    orders
}