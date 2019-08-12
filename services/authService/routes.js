const { Router } = require('express')
const router = new Router()
const signup = require('./controllers/signup')
const login = require('./controllers/login')
const { sendVerifyEmail, verifyUser } = require('./controllers/verify')
const refresh = require('./controllers/refresh')


router.all('/', (_, res) => { res.send('Authenticator') })
router.post('/auth/signup', signup)
router.post('/auth/login', login)
router.post('/auth/login/verify', sendVerifyEmail)
router.put('/auth/login/verify', verifyUser)
router.post('/auth/refresh', refresh)


module.exports = router