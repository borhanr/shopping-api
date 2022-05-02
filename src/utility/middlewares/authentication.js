const HttpResponse = require('../http')
const UserService = require('../../database/services/user.service')
const tokenHandler = require('../token');
const catchAsync = require('../catchAsync')

class AuthenticationMiddleware {
    constructor(models) {
        this.userService = new UserService(models);
    }

    authToken = catchAsync(async (req, res, next) => {
        const authHeader = req.headers.authorization
        const token = authHeader?.split(' ')[1]

        if (!token)
            return res.status(401)
                .json(new HttpResponse(
                    401,
                    'The token was not found'
                ))

        const decode = await tokenHandler.checkToken(token)

        const user = await this.userService.findUserById(decode.id)
        if (!user) {
            return res.status(401)
                .json(new HttpResponse(
                    401,
                    'The token is invalid'
                ))
        }
        req.user = {
            userId: user._id
        }
        next()

    })
}

module.exports = AuthenticationMiddleware;