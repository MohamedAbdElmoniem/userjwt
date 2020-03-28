var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
var CreateDBConnection = require('./DbConnection')
var UserApis = require('./apis/user.api')
var ProductApis = require('./apis/product.api')

app.use(cookieParser())
app.use(express.json())
CreateDBConnection()

UserApis(app)
ProductApis(app)

// first api 
app.get("/", (req, resp) => {
    resp.json({ message: 'server is running..' })
})

app.listen(8081)