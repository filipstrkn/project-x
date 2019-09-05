const jwt = require('jsonwebtoken')


async function check(req, res) {

    const refresh_token = req.headers['x-refresh']

    try {

        jwt.verify(refresh_token, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) throw new Error()

            const userId = decoded.uid
            return res.status(200).send()

        })
    } catch (err) {
        return res.status(401).send()
    }
}


module.exports = check