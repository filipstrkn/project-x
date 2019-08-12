const jwt = require('jsonwebtoken')
const TokenModel = require('../models/Token')


/*
|----------------------------------------------------------------------
| Generate a new JWT Token
|----------------------------------------------------------------------
|
|
|
*/
/**
 * @param { Array<String> }
 * @param { ObjectConstructor } payload
 * @returns { String } JWT token
 */
const generateToken = ([secret, life], payload) =>
    jwt.sign(
        payload,
        process.env[secret],
        { expiresIn: process.env[life] }
    )


/*
|----------------------------------------------------------------------
| Replace a Refresh token in Database
|----------------------------------------------------------------------
|
|
|
*/
/**
 * @param { String } tokenId
 * @param { String } userId
 */
const replaceRefreshToken = async (token, userId) => {
    try {
        await TokenModel.findOneAndDelete({ userId })
        await TokenModel.create({ token, userId })
        return { message: 'success' }
    } catch (error) {
        return { error }
    }
}


/*
|----------------------------------------------------------------------
| Replace a Refresh token in Database
|----------------------------------------------------------------------
|
|
|
*/
/**
 * Refresh tokens
 * @param { ObjectConstructor } options
 */
const refreshTokens = user => {

    /**
     *
     */
    const { _id } = user
    const accessToken = generateToken(['JWT_SECRET', 'JWT_LIFE'], {type: 'access'})
    const refreshToken = generateToken(['REFRESH_SECRET', 'REFRESH_LIFE'], {type: 'refresh', userId: _id})

    /**
     *
     */
    return replaceRefreshToken(refreshToken, user._id)
        .then(res => {
            if (res.message === 'success') return {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        })
        .catch(err => err)
}



module.exports = {
    refreshTokens
}