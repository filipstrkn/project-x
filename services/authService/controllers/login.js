const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const TokenModel = require('../models/Token')
const { getAccessToken, getRefreshToken } = require('../utils/token')



/**
 *
 *  Login
 *  ---
 *
 *
 *  Najit email
 *  Overit heslo
 *  najit refresh token
 *  pokud existuje vratit s novym acess tokenem
 *  pokud neexistuje vytvorit a vratit
 *
 */
async function login(req, res) {

    const { email, password } = req.body

    try {

        /**
         *
         *  Find a user by a email that has been
         *  provided by user when login.
         *
         */
        const user = await UserModel.findOne({ email })

        /**
         *
         *  Validate a password that was also
         *  provided by user while login.
         *
         *  During validation the provided password
         *  is hashed with the same  algorithm,
         *  eventually it's compared to the one
         *  saved in database.
         *
         */
        await user.validatePassword(password)

        /**
         *
         *  In case that provided credentials are
         *  valid. We try to find if the token
         *  is already existing in db or not.
         *
         */

        const token = await TokenModel.findOne({ userId: user._id })

        if (!token) {
            const newToken = new TokenModel({
                userId: user._id,
                token: getRefreshToken(user._id)
            })

            await newToken.save()

            return res.status(200).json({
                access_token: getAccessToken(),
                refresh_token: newToken
            })
        }

        jwt.verify(token.token, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(409).json({
                message: 'Validating tokens has failed'
            })

            if (
                decoded.uid === user._id.toString() &&
                decoded.aid === process.env.APP_ID
            ) return res.status(200).json({
                    access_token: getAccessToken(),
                    refresh_token: token.token
            })

        })

    } catch (err) {

        /**
         *
         *  If any error appears during the process,
         *  It will throw a new Unauthorized err.
         *
         */
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}


module.exports = login