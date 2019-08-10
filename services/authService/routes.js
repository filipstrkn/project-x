const { Router } = require('express')
const router = new Router()
const signup = require('./controllers/signup')
const login = require('./controllers/login')
const refresh = require('./controllers/refresh')


router.all('/', (_, res) => { res.send('Authenticator') })
router.post('/auth/signup', signup)
router.post('/auth/login', login)
router.post('/auth/refresh', refresh)


module.exports = router