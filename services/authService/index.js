require('dotenv').config({
    path: '../.env'
})
require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(router)


app.listen(process.env.AUTH_PORT, () => {
    console.log('Authenticator has joined the party on ' + process.env.AUTH_PORT )
})