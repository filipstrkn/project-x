const redisClient = require('../database/redisClient')
const jwt = require('jsonwebtoken')
const { getRefreshToken, expireInDays } = require('../utils/token')


/**
 *
 *  Verifying a user middleware
 *  ---
 *  kwnedkwe
 *  kwnedkwe
 *  kwnedkwe
 *  kwnedkwe
 *
 */
function verifyUser(req, res, next) {

    const refresh_token = req.headers['x-refresh']

    jwt.verify(refresh_token, process.env.REFRESH_SECRET, (err, decoded) => {

        /**
         *
         *  If Refresh token has expired,
         *  throw a response with a status 401.
         *
         */
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Refresh token has expired'
            })
        }

        /**
         *
         *  If JWT token is invalid or has been
         *  generated on other source
         *  throw a error with status 403
         *
         */
        if (
            decoded.aid !== process.env.APP_ID ||
            err instanceof jwt.JsonWebTokenError
        ) {
            return res.status(403).json({
                message: 'Refresh token is invalid'
            })
        }


        /**
         *
         *  Compare the provided
         *
         */
        const refreshedToken = getRefreshToken(decoded.uid.toString())
        redisClient.setex(
            decoded.uid.toString(),
            expireInDays(process.env.REFRESH_LIFE),
            refreshedToken,
            () => {
                req.refresh = refreshedToken
                next()
            }
        )


    })

}


module.exports = verifyUser