var jwt = require('jsonwebtoken')
var config = require('../config/index')

function refreshUserToken(req, resp, next) {
    if (req.cookies.refreshToken) {
        let user = jwt.verify(req.cookies.refreshToken, config.token_secretkey)
        let newToken = jwt.sign({ username: user.username }, config.token_secretkey, {
            algorithm: "HS256",
            expiresIn: 10
        })
        resp.cookie("token", newToken, { maxAge: 10 * 1000 })
        next()
    } else {
        resp.json({ message: 'please login again' })
    }
}

const common = {

    UserAuth: (req, resp, next) => {

        try {
            if (req.cookies.token && jwt.verify(req.cookies.token, config.token_secretkey)) {
                next()
            } else {
                refreshUserToken(req, resp, next)
            }
        } catch (e) {
            refreshUserToken(req, resp, next)
        }
    }

}

module.exports = common