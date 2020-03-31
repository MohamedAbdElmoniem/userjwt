var mongoose = require('mongoose')
var config = require('./config/index')

function CreateDBConnection() {
    mongoose.connect(config.db_connection) // mongo lab
    // mongoose.connect(config.db_connection_local) //local
}

module.exports = CreateDBConnection