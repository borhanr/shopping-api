const ProductService = require('../database/services/product.service');
const CategoryService = require('../database/services/category.service');
const HttpResponse = require('../utility/http')
const catchAsync = require('../utility/catchAsync')

class ProductController {
    constructor(models) {
        this.productService = new ProductService(models)
        this.categoryService = new CategoryService(models)
    }

    listProducts = catchAsync(async (req, res) => {
        const {categoryId} = req.params;

        const isCategoryExist = await this.categoryService.checkCategoryExistById(categoryId)
        if (!isCategoryExist)
            return res.status(404)
                .json(new HttpResponse(
                    404,
                    'There is no category associated with this id'
                ))

        const products = await this.productService.listProductsByCategoryId(categoryId)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'List of category products sent successfully',
                {products}
            ))
    })

    getProduct = catchAsync(async (req, res) => {
        const {productId} = req.params;

        const isProductExist = await this.productService.checkProductExistById(productId)
        if (!isProductExist)
            return res.status(404)
                .json(new HttpResponse(
                    404,
                    'There is no product associated with this id'
                ))

        const product = await this.productService.getProductById(productId)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'Category data sent successfully',
                {product}
            ))
    })
}

module.exports = ProductController;