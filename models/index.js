var mongoose = require('mongoose')
var UserSchema = require('./schema/user.schema')
var ProductSchema = require('./schema/product.schema')


var UserModel = new mongoose.model("user", UserSchema)
var ProductModel = new mongoose.model("product", ProductSchema)


module.exports = {
    UserModel, ProductModel
}