const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const TokenModel = require('../models/Token')
const { refreshTokens } = require('../utils/token')


const errs = {
    401: {
        message: 'Auth failed'
    },
    404: {
        message: 'Auth not found'
    }
}


/**
 * @returns { Object } tokens
 */
const getTokens = (json) => ({
    userId: json._id,
    token: jwt.sign(
        json,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFE }
    ),
    refreshToken: jwt.sign(
        json,
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_LIFE }
    )
})





const resolveCompare = (err, result, json) =>
    new Promise((resolve, reject) => {
        if (err || !result) reject(err)
        resolve(getTokens(json))
})


const saveToken = async tokens => {
    try {
        const newToken = new TokenModel({
            userId: tokens.userId,
            token: tokens.refreshToken
        })
        await newToken.save()
        return true
    } catch (err) {
        return false
    }
}



async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        const resolveCompare = async result => {
            if (result) {
                refreshTokens(user)
                .then(tokens => {
                    res.status(200).json(tokens)
                }).catch(err => {
                    res.status(401).json(err)
                })
            }

        }
        const rejectCompare = err => {
            res.status(401).json(errs[401])
        }

        if (!user) return res.status(401).json(errs[401])
        bcrypt
            .compare(password, user.password)
            .then(resolveCompare)
            .catch(rejectCompare)

    } catch (err) {
        res.status(404).json(errs[404])
    }

}


module.exports = login