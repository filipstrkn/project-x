const { Schema, model } = require('mongoose')


const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        validate: {
            validator(val) {
                if (typeof val !== 'string') return false
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(val.toLowerCase())
            },
            msg: props => `${props.value} is not a valid email.`
        }
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})


const UserModel = model('User', UserSchema)


module.exports = UserModel