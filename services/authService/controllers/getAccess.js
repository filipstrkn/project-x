const { getAccessToken } = require('../utils/token')


// New approach
//  1. get refersh token
//  2. check validity and if is expired
//  3. generate a new access token
//  4. save a new refresh token to the database
//  5. send a response with a new access token and a new refreshh token


/**
 *
 *  Get Access Token
 *  ---
 *
 */
async function getAcess(req, res) {
    try {
        res.status(200).json({
            access_token: getAccessToken(),
            refresh_token: req.refresh
        })
    } catch (err) {
        return res.status(403).end()
    }
}


module.exports = getAcess