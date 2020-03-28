var mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: String,
    product_desc: String,
    product_price: Number,
    category_name: String
})

module.exports = ProductSchema

