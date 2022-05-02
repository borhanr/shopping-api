const UserService = require('../database/services/user.service');
const CartService = require('../database/services/cart.service');
const HttpResponse = require('../utility/http')
const helpers = require('../utility/helpers')
const tokenHandler = require('../utility/token')
const catchAsync = require('../utility/catchAsync')

class AuthController {
    constructor(models) {
        this.userService = new UserService(models)
        this.cartService = new CartService(models)
    }

    signup = catchAsync(async (req, res) => {
        let {email, name, password} = req.body;

        const isUserExist = await this.userService.checkUserExistByEmail(email)
        if (isUserExist)
            return res.status(409)
                .json(new HttpResponse(
                    409,
                    'There is already a user with this email address'
                ))

        password = await helpers.hashPassword(password)

        const createdUser = await this.userService.createUser({
            email, name, password
        })
        await this.cartService.createCart(createdUser._id) // create user cart

        const token = await tokenHandler.generateToken(createdUser._id)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'User successfully registered',
                {token, user: createdUser.toJSON()}
            ))
    })

    login = catchAsync(async (req, res) => {
        const {email, password} = req.body;

        let invalidEmailOrPassword = false,
            user;

        const isUserExist = await this.userService.checkUserExistByEmail(email)
        if (!isUserExist)
            invalidEmailOrPassword = true;

        user = isUserExist && await this.userService.findUserByEmail(email)

        const isValidPassword = isUserExist && await helpers.checkPasswordHash(password, user.password)
        if (isUserExist && !isValidPassword)
            invalidEmailOrPassword = true;

        if (invalidEmailOrPassword)
            return res.status(401)
                .json(new HttpResponse(
                    401,
                    'Email/Password is invalid'
                ))

        const token = await tokenHandler.generateToken(user._id)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'User has successfully logged in',
                {token, user: user.toJSON()}
            ))
    })
}

module.exports = AuthController;