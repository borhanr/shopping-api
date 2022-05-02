const router = require('express').Router();
const AuthController = require('../controllers/auth.controller')
const {validate} = require('../utility/middlewares/validator')
const {signup, login} = require('../validations/auth.validation')

class AuthRoute {

    constructor(models) {
        this.path = '/auth';
        this.router = router;
        this.controller = new AuthController(models)
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            `${this.path}/signup`,
            validate(signup),
            this.controller.signup);

        this.router.post(
            `${this.path}/login`,
            validate(login),
            this.controller.login
        )
    }
}

module.exports = AuthRoute;