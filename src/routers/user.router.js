const router = require('express').Router();
const UserController = require('../controllers/user.controller')
const AuthMiddleware = require('../utility/middlewares/authentication')
const {validate} = require('../utility/middlewares/validator')
const {checkProductByParam} = require('../validations/product.validation')

class UserRoute {

    constructor(models) {
        this.path = '/user';
        this.router = router;
        this.controller = new UserController(models)
        this.authMiddleware = new AuthMiddleware(models);
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(
            `${this.path}/cart`,
            this.authMiddleware.authToken,
            this.controller.getCart);

        this.router.post(
            `${this.path}/cart/:productId`,
            this.authMiddleware.authToken,
            validate(checkProductByParam),
            this.controller.addItemToCart);

        this.router.delete(
            `${this.path}/cart/:productId`,
            this.authMiddleware.authToken,
            validate(checkProductByParam),
            this.controller.removeItemFromCart);
    }
}

module.exports = UserRoute;