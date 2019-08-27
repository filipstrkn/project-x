const redisClient = require('../database/redisClient')


function resolveRedisError(_, res, next) {
    redisClient.on('error', err => {
        return res.status(401).json({
            message: 'Reaching token has failed',
            error: err
        })
    })
    return next()
}


module.exports = resolveRedisError