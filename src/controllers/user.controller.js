const CartService = require('../database/services/cart.service');
const ProductService = require('../database/services/product.service');
const HttpResponse = require('../utility/http')
const catchAsync = require('../utility/catchAsync')

class UserController {
    constructor(models) {
        this.cartService = new CartService(models)
        this.productService = new ProductService(models);
    }

    getCart = catchAsync(async (req, res) => {
        const {userId} = req.user

        const cart = await this.cartService.getUserCart(userId)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'User cart sent successfully',
                {cart}
            ))
    })

    addItemToCart = catchAsync(async (req, res) => {
        const {userId} = req.user
        const {productId} = req.params

        const isProductExist = await this.productService.checkProductExistById(productId)
        if (!isProductExist)
            return res.status(200)
                .json(new HttpResponse(
                    404,
                    'There is no product associated with this id'
                ))

        const cartHasProduct = await this.cartService.checkCartHasProduct(userId, productId)
        if (cartHasProduct)
            await this.cartService.changeProductCount(userId, productId, 1)
        else
            await this.cartService.addProductToCart(userId, productId)

        const cart = await this.cartService.getUserCart(userId)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'The product has been added to the cart successfully',
                {cart}
            ))
    })

    removeItemFromCart = catchAsync(async (req, res) => {
        const {userId} = req.user
        const {productId} = req.params

        const isProductExist = await this.productService.checkProductExistById(productId)
        if (!isProductExist)
            return res.status(404)
                .json(new HttpResponse(
                    404,
                    'There is no product associated with this id'
                ))

        const cartHasProduct = await this.cartService.checkCartHasProduct(userId, productId)
        if (!cartHasProduct) {
            return res.status(400)
                .json(new HttpResponse(
                    400,
                    'There is no product associated with this id in your cart'
                ))
        }

        const productCount = await this.cartService.countSpecificProductInCart(userId, productId)

        if (productCount > 1)
            await this.cartService.changeProductCount(userId, productId, -1) // decrement product count
        else
            await this.cartService.removeProductFromCart(userId, productId)

        const cart = await this.cartService.getUserCart(userId)

        return res.status(200)
            .json(new HttpResponse(
                200,
                'The product has been removed from the cart successfully',
                {cart}
            ))
    })
}

module.exports = UserController;