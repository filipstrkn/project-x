const UserModel = require('../models/User')
const { refreshTokens } = require('../utils/token')


async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        await user.validatePassword(password)
        const tokens = await refreshTokens(user)
        res.status(200).json(tokens)
    } catch (err) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
}


module.exports = login