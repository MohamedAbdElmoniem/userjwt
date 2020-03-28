var UserModel = require('../models/index').UserModel
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var config = require('../config/index')
var common = require('../common/index')

function UserApis(app) {

    // signup
    app.post('/signup', async (req, resp) => {
        try {
            const { username, email, password, phone, age } = req.body
            let newUser = new UserModel({
                _id: mongoose.Types.ObjectId(),
                username, email, password, phone, age
            })
            await newUser.save()
            resp.status(200).json({ messsage: 'success' })
        } catch (error) {
            resp.json({ message: error })
        }
    })

    // api - signin + generate token using jsonwebtoken library

    app.post("/signin", async (req, resp) => {
        const { username, password } = req.body
        let user = await UserModel.findOne({ username, password }).select("username age , email , phone")
        if (user) {
            // generate token
            let token = jwt.sign({ username }, config.token_secretkey, {
                algorithm: "HS256",
                expiresIn: 10 // seconds backend
            })
            let refreshToken = jwt.sign({ username }, config.token_secretkey, {
                algorithm: "HS256",
                expiresIn: 300 // seconds backend
            })
            console.log(token)
            resp.cookie('token', token, { maxAge: 10 * 1000 }) // milliseconds frontend
            resp.cookie('refreshToken', refreshToken, { maxAge: 300 * 1000 }) // milliseconds frontend
            resp.json({ message: 'success', user })
        } else {
            // not found in database
            resp.json({ message: 'not found' })
        }
    })

    // api - logout --> clear cookie --> token



    app.get('/signout', async (req, resp) => {
        resp.cookie("token", "")
        resp.cookie("refreshToken", "")
        resp.json({ message: "logged out" })
    })


    // api - get all users 
    app.get('/allusers', common.UserAuth, async (req, resp) => {
        let users = await UserModel.find({})
        resp.json({ message: 'success', users })
    })

}

module.exports = UserApis