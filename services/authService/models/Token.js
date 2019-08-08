const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')


const TokenSchema = new Schema({
    userId: Schema.Types.ObjectId,
    token: {
        type: String,
        required: true,
        // validate: {
        //     validator(val) {
        //         jwt.verify(val, process.env.REFRESH_SECRET, (err, result) => {
        //             if (err) return false
        //             return result
        //         })
        //     },
        //     msg: () => `Refresh token is not valid`
        // }
    }
})


const TokenModel = model('Token', TokenSchema)


module.exports = TokenModel