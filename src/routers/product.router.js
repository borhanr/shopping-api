const router = require('express').Router();
const ProductController = require('../controllers/product.controller')
const {validate} = require('../utility/middlewares/validator')
const {listProducts, checkProductByParam} = require('../validations/product.validation')

class ProductRoute {

    constructor(models) {
        this.path = '/product';
        this.router = router;
        this.controller = new ProductController(models)
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(
            `${this.path}/category/:categoryId`,
            validate(listProducts),
            this.controller.listProducts);

        this.router.get(
            `${this.path}/:productId`,
            validate(checkProductByParam),
            this.controller.getProduct);
    }
}

module.exports = ProductRoute;