const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
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
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    user_id: {
        type: String, 
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Item', itemSchema)