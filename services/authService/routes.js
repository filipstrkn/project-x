const { Router } = require('express')
const router = new Router()
const signup = require('./controllers/signup')
const login = require('./controllers/login')
const { sendVerifyEmail } = require('./controllers/verify')
const check = require('./controllers/check')
const refresh = require('./controllers/refresh')
const getAcess = require('./controllers/getAccess')
const verifyUserMiddleware = require('./middlewares/verifyUser')
const resolveRedisError = require('./middlewares/resolveRedisError')



/**
 *
 *  Root route
 *  ---
 *  When the root route will be reached,
 *  It will responds only with a simple
 *  message to verify that authenticator
 *  is running, strong and healthy.
 *
 */
router.all('/', (_, res) => { res.send('Authenticator') })

/**
 *
 *  Signup route
 *  ---
 *  User is going to be created and a new refresh
 *  token is going to be sent back.
 *
 */
router.post('/auth/signup', signup)

/**
 *
 *  Login routes
 *  ---
 *
 *
 *
 */
router.post('/auth/login', resolveRedisError, login)
router.post('/auth/login/verify', sendVerifyEmail)
router.get('/auth/login/check', check)

/**
 *
 *  Logout route
 *  ---
 *  If a user reaches this route his refresh token
 *  will be deleted from database.
 *  The user will loose access from all
 *
 *
 */
// router.delete('/auth/logout', logout)

/**
 *
 *  Get Access Token
 *  ---
 *
 *
 *
 */
router.post('/auth/refresh', refresh)
router.get('/auth/token', verifyUserMiddleware, getAcess)



module.exports = router