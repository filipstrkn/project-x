const UserModel = require('../models/User')
const getTransporter = require('../utils/email')
const Email = require('email-templates')


async function reset(req, res) {

    const { userId, password } = req.body

    try {
        const user = await UserModel.findById(userId)
        await user.setPassword(password)
        res.status(200).json({
            message: 'New email was succesfully saved'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Reseting a password has failed'
        })
    }
}


async function sendResetEmail(req, res) {

    /**
     *
     */
    const { email } = req.body

    /**
     *
     */
    let user;
    try {
        user = await UserModel.findOne({ email })
    } catch (error) {
        res.status(500).json({
            message: 'User has not been found'
        })
    }


    /**
     *
     */
    const emailer = new Email({ transport: getTransporter() })
    emailer.send({
        template: 'reset',
        locals: {
            resetLink: `http://localhost:3000/login/reset?user=${user._id}`
        }
    }).then(() => {
        res.status(200).json({
            message: 'Reset email has been sent'
        })
    }).catch(() => {
        res.status(500).json({
            message: 'Sending a reset email failed'
        })
    })

}


module.exports = {
    reset,
    sendResetEmail
}