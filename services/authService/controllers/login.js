const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const { refreshTokens } = require('../utils/token')


const errs = {
    401: {
        message: 'Auth failed'
    },
    404: {
        message: 'Auth not found'
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        const resolveCompare = async result => {
            if (result) {
                refreshTokens(user)
                .then(tokens => {
                    res.status(200).json(tokens)
                }).catch(err => {
                    res.status(401).json(err)
                })
            }

        }
        const rejectCompare = err => {
            res.status(401).json(errs[401])
        }

        if (!user) return res.status(401).json(errs[401])
        bcrypt
            .compare(password, user.password)
            .then(resolveCompare)
            .catch(rejectCompare)

    } catch (err) {
        res.status(404).json(errs[404])
    }

}


module.exports = login