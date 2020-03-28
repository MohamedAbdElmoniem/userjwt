var mongoose = require('mongoose')
var config = require('./config/index')

function CreateDBConnection() {
    mongoose.connect(config.db_connection)
}

module.exports = CreateDBConnection