const { Schema, model } = require('mongoose')
const crypto = require('crypto')
const hashConfig = {
    len: 64,
    // alg: 'sha512',
    // rep: 1000
}


const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator(val) {
                if (typeof val !== 'string') return false
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(val.toLowerCase())
            },
            msg: props => `${props.value} is not a valid email.`
        }
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    verified: {
        type: Boolean
    }
})


/**
 *
 */
UserSchema.methods.setPassword = function (password) {

    /**
     *
     */
    return new Promise((resolve, reject) => {

        /**
         *
         */
        const generateSalt = cb => {
            this.salt = crypto.randomBytes(16, (err, buff) => {
                if (err) reject(err)
                this.salt = buff.toString('hex')
                cb(this.salt)
            })
        }

        /**
         *
         */
        const generatePassword = salt => {
            crypto.scrypt(
                password,
                salt,
                hashConfig.len,
                (err, buffer) => {
                    if (err) reject(err)
                    const hash = buffer.toString('hex')
                    this.hash = hash
                    resolve(hash)
                }
            )
        }

        /**
         *
         */
        generateSalt(generatePassword)

    })
}


/**
 *
 *  Validate User's Password
 *  ---
 *
 *
 *
 * @description validate password
 * @param { String } password
 * @returns { Promise }
 */
UserSchema.methods.validatePassword = function (password) {

    /**
     *
     * Create a promise that returns
     * the result from validating passowrd
     *
     */
    return new Promise((resolve, reject) => {

        /**
         *
         * encrypt the password agai with the same salt from database
         * and compare the result with the hash saved in db.
         *
         */
        crypto.scrypt(
            password,
            this.salt,
            hashConfig.len,
            (err, buff) => {
                if (err) reject(err)
                const hash = buff.toString('hex')

                if (this.hash === hash) resolve(true)
                else reject(false)
            }
        )
    })

}


const UserModel = model('User', UserSchema)


module.exports = UserModel