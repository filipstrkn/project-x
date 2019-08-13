const UserModel = require('../models/User')
const getTransporter = require('../utils/email')
const Email = require('email-templates')


async function sendVerifyEmail(req, res) {

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
        template: 'verification',
        locals: {
            verificationLink: `http://localhost:3000/login/verification?user=${user._id}`
        }
    }).then(() => {
        res.status(200).json({
            message: 'Verification email has been sent'
        })
    }).catch(err => {
        res.status(500).json({
            message: 'Sending a verification email failed'
        })
    })

}



async function verifyUser(req, res) {

    /**
     *
     */
    const { userId } = req.body

    try {

        await UserModel.findByIdAndUpdate(userId, {
            verified: true
        })
        res.status(200).json({
            message: `User's email has been verified`,
            userId
        })

    } catch (error) {
        res.status(500).json({
            message: 'Verifying a user has failed'
        })
    }

}


module.exports = {
    sendVerifyEmail,
    verifyUser
}