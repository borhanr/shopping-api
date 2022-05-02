const jwt = require('jsonwebtoken')

class TokenHandler {
    secretKey = process.env.JWT_SECRET_KEY;

    async generateToken(userId) {
        return await jwt.sign({
                id: userId
            }, this.secretKey,
            {expiresIn: '6h'})
    }

    async checkToken(token) {
        return jwt.verify(token, this.secretKey)
    }
}

module.exports = new TokenHandler()
