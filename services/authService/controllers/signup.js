const bcrypt = require('bcrypt')
const UserModel = require('../models/User')


async function signup(req, res) {
    const { name, email, password } = req.body
    // Check if user already exist in db
    try {
        const isExisting = await UserModel.findOne({ email })
        if (isExisting) return res.status(409).send({
            error: 'Email already exists'
        })
    } catch (err) {
        res.status(404).end(err)
    }

    // else
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) return res.status(500).json(err)
        const userBody = {
            name,
            email,
            password: hash,
            verified: false
        }
        const user = new UserModel(userBody)
        await user.save()
        // send email to verify a user
        res.send(user)
    })
}


module.exports = signup