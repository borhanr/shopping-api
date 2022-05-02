const CategoryService = require('../database/services/category.service');
const HttpResponse = require('../utility/http')
const catchAsync = require('../utility/catchAsync')

class CategoryController {
    constructor(models) {
        this.categoryService = new CategoryService(models)
    }

    listCategories = catchAsync(async (req, res) => {
        const categories = await this.categoryService.listCategories()

        return res.status(200)
            .json(new HttpResponse(
                200,
                'List of categories sent successfully',
                {categories}
            ))
    })

    getCategory = catchAsync(async (req, res) => {
        const {categoryId} = req.params;

        const isCategoryExist = await this.categoryService.checkCategoryExistById(categoryId)
        if (!isCategoryExist)
            return res.status(404)
                .json(new HttpResponse(
                    404,
                    'There is no category associated with this id'
                ))

        const category = await this.categoryService.getCategoryById(categoryId)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'Category data sent successfully',
                {category}
            ))
    })
}

module.exports = CategoryController;