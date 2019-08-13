const UserModel = require('../models/User')


async function signup(req, res) {
    const { email, password } = req.body
    // Check if user already exist in db
    try {
        const isExisting = await UserModel.findOne({ email })
        if (isExisting) return res.status(409).send({
            error: 'Email already exists'
        })

        const user = new UserModel({ email, verified: false })
        await user.setPassword(password)
        await user.save()
        res.status(200).json({
            message: 'A new user successfully created'
        })

    } catch (err) {
        res.status(404).end(err)
    }
}


module.exports = signup