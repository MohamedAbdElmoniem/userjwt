var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, maxlength: 25, required: true },
    email: String,
    password: { type: String, required: true, minlength: 6 },
    age: Number,
    phone: String
})

module.exports = UserSchema