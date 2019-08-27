const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const redisClient = require('../database/redisClient')
const { getAccessToken, getRefreshToken } = require('../utils/token')



/**
 *
 *  Login
 *  ---
 *
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
        const e = getRefreshToken(user._id)
        redisClient.setnx(user._id, e, () => {

            /**
             *
             *  In case that provided credentials are
             *  valid. We try to find if the token
             *  is already existing in db or not.
             *
             */
            redisClient.get(user._id.toString(), (__, reply) => {

                /**
                 *
                 *  In case that provided credentials are
                 *  valid. We try to find if the token
                 *  is already existing in db or not.
                 *
                 */
                jwt.verify(reply, process.env.REFRESH_SECRET, err => {

                    if (err) return res.status(409).json({
                        message: 'Validating tokens has failed'
                    })

                    return res.status(200).json({
                        access_token: getAccessToken(),
                        refresh_token: reply
                    })
                })

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