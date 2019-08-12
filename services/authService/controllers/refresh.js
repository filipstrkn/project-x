const jwt = require('jsonwebtoken')
const TokenModel = require('../models/Token')
const UserModel = require('../models/User')
const { refreshTokens } = require('../utils/token')


function refresh(req, res) {

    const { refresh_token } = req.body

    /**
     *
     */
    try {
        const token = jwt.verify(refresh_token, process.env.REFRESH_SECRET)
        if (token.type !== 'refresh') {
            res.status(400).json({
                message: 'Invalid token'
            })
        }

        /**
         *
         */
        return TokenModel
            .findOne({ userId: token.userId })
            .exec()
            .then(token => {
                if (!token) return res.status(400).json({
                    message: 'Token is empty'
                })
                const user = UserModel.findById(token.userId)
                return user.exec().then(refreshTokens)
            })
            .then(tokens => {
                res.status(200).json(tokens)
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })

    } catch (err) {

        /**
         *
         */
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                message: 'Token expired'
            })
            return
        } else if (err instanceof jwt.JsonWebTokenError) {
            res.status(409).json({
                message: 'Invalid token'
            })
            return
        }

    }

}


module.exports = refresh