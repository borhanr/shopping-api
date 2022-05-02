class CartService {

    constructor(models) {
        this.models = models;
    }

    createCart = async (userId) => {
        await this.models.cart.create({
            userId
        })
    }

    getUserCart = async (userId) => {
        return await this.models.cart.findOne({
            userId
        })
    }

    // Check that the product already exists in the cart of the user
    checkCartHasProduct = async (userId, productId) => {
        return await this.models.cart.findOne({
            userId,
            'products.productId': productId
        })
    }

    addProductToCart = async (userId, productId) => {
        await this.models.cart.updateOne({
            userId
        }, {
            $push: {
                products: {
                    productId,
                    count: 1
                }
            }
        })
    }

    removeProductFromCart = async (userId, productId) => {
        await this.models.cart.updateOne({
            userId,
        }, {
            $pull: {
                products: {
                    productId
                }
            }
        })
    }

    // Increment or decrement count based on passed value if product exists in cart
    changeProductCount = async (userId, productId, value) => {
        await this.models.cart.updateOne({
            userId,
            'products.productId': productId
        }, {
            $inc: {
                'products.$.count': value
            }
        })
    }

    // Count the  specific product in the user cart
    countSpecificProductInCart = async (userId, productId) => {
        const cart = await this.models.cart.findOne({
            userId,
            'products.productId': productId
        })
        return cart.products[0].count
    }
}

module.exports = CartService;