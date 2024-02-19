const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            throw { name: "InvalidToken" }
        }
        const rawToken = authorization.split(' ')
        if (rawToken[0] !== 'Bearer') {
            throw { name: "InvalidToken" }
        }

        const result = verifyToken(rawToken[1])
        const user = await User.findByPk(result.id)
        if (!user) {
            throw { name: "InvalidToken" }
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication

