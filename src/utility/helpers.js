const bcrypt = require('bcrypt')

class Helpers {
    async hashPassword(password) {
        return await bcrypt.hash(password, 10)
    }

    async checkPasswordHash(password, hash) {
        return await bcrypt.compare(password, hash)
    }
}

module.exports = new Helpers();