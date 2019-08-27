const jwt = require('jsonwebtoken')


const expireInDays = days => {
    const aDay = 86400
    return Math.floor(Date.now() / 1000 + (aDay * days))
}

const getAccessToken = () => jwt.sign(
    {
        typ: 'access',
        aid: process.env.APP_ID
    },
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE }
)

const getRefreshToken = userId => {
    return jwt.sign(
    {
        typ: 'refresh',
        uid: userId,
        aid: process.env.APP_ID
    },
    process.env.REFRESH_SECRET, { expiresIn: expireInDays(process.env.REFRESH_LIFE) }
)}


module.exports = {
    getAccessToken,
    getRefreshToken,
    expireInDays
}