const mongoose = require('mongoose')

const Schema = mongoose.Schema

const soldItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    seller_user_id: {
        type: String, 
        required: true
    },
    buyer_user_id: {
        type: String, 
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Sold_Items', soldItemSchema)