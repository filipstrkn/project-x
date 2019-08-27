const redis = require('redis')


/**
 *
 *  Redis Client
 *  ---
 *
 */
const redisClient = redis.createClient({
    port: process.env.REDIS_PORT
})


module.exports = redisClient