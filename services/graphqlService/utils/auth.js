const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server');
const fetch = require('node-fetch')


// New approach
// ======================================================================
//  1. send a refresh token to auth api
//  2. check and refresh one or throw a error
//  on response, check existance of a access token and its validation, if not throw an error. attach a new generated refresh token to the context and send it to the response headers
// ----------------------------------------------------------------------
//  Dont do any validation here. all token validation should be on authentication server
//  Here we dont care if refresh token is valid. Just give it to me a access token
//  The we validate the access token.
// ----------------------------------------------------------------------
//  Fetch a new access token only if the one is not valid
// ----------------------------------------------------------------------
//  Always receive a refresh token and access token





// Verify a access token
const verifyTokenOrigin = (token, secret) => jwt
    .verify(token, secret, (err, decoded) => {
        if (decoded.aid === process.env.APP_ID) return
        else throw new AuthenticationError('Invalid access token origin')
    }
)


/**
 *  Refreshing access and refresh token
 */
const refreshTokens = refreshToken => {
    return fetch(process.env.AUTH_URL + '/auth/token', {
        method: 'GET',
        headers: { authorization: refreshToken }
    })
    .then(res => res.json())
    .then(json => verifyTokenOrigin(json.access_token, process.env.JWT_SECRET))
    .catch(_ => {
        throw new AuthenticationError('Refreshing access token has failed')
    })
}


/**
 *  Resoling Acces Token
 */
const resolveAccessToken = (err, tokens) => {
    /**
     *
     */
    const updatedTokens = {
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token
    }

    /**
     *
     */
    if (err instanceof jwt.TokenExpiredError) {
        updatedTokens = refreshTokens(refresh_token)
    }

    /**
     *
     */
    if (err instanceof jwt.JsonWebTokenError) {
        throw new AuthenticationError(err)
    }

    /**
     *
     */
    return updatedTokens
}


/**
 *
 *  Authenticate
 *  ---
 *  Get and object with an access token and a refresh token
 *  It will walidates them
 *  @param { Object } tokens
 *  @returns { Object } object with a access and a refresh token
 *
 */
function auth(tokens) {
    return jwt.verify(tokens.access_token, process.env.JWT_SECRET, err => resolveAccessToken(err, tokens))
}


module.exports = auth