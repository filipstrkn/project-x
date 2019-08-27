const mongoose = require('mongoose')


/*
|----------------------------------------------------------------------
| Creating a connection to MongoDB
|----------------------------------------------------------------------
|
|
|
*/
mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true })
/**
 *
 */
mongoose.connection.once('open', () => {
    console.log('Authenticator is connected to database ')
})


module.exports = mongoose