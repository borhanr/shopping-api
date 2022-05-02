const router = require('express').Router();
const CategoryController = require('../controllers/category.controller')
const {validate} = require('../utility/middlewares/validator')
const {getCategory} = require('../validations/category.validation')

class CategoryRoute {

    constructor(models) {
        this.path = '/category';
        this.router = router;
        this.controller = new CategoryController(models)
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(
            `${this.path}`,
            this.controller.listCategories);

        this.router.get(
            `${this.path}/:categoryId`,
            validate(getCategory),
            this.controller.getCategory);
    }
}

module.exports = CategoryRoute;