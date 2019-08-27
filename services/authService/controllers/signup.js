const UserModel = require('../models/User')


/**
 *
 *  SignUp
 *  ---
 *
 *
 */
async function signup(req, res) {

    const { email, password } = req.body

    try {

        /**
         *
         *  If user already exists in database send a 'conflict'
         *  error with a description message.
         *
         */
        const isExisting = await UserModel.findOne({ email })
        if (isExisting) return res.status(409).send({
            error: 'Email already exists'
        })

        /**
         *
         *  In other case, create a new user and hash
         *  the provided password with
         *  a little bit of salt.
         *
         */
        const user = new UserModel({ email, verified: false })
        await user.setPassword(password)
        await user.save()

        /**
         *
         *  If user has been succesfully save to db.
         *  Send a success response with
         *  a description message.
         *
         *
         */
        return res.status(200).json({
            message: 'A new user successfully created'
        })


    } catch (err) {

        /**
         *
         *  If anything fails during the process,
         *  retrieve a 500 error.
         *
         */
        return res.status(500).end(err)

    }
}


module.exports = signup