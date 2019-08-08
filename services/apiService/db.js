const mongoose = require('mongoose')


mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Authenticator is connected to db ')
})


module.exports = mongoose