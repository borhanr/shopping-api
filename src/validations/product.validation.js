const {Joi} = require('express-validation')

module.exports = {
    listProducts: {
        params: Joi.object({
            categoryId: Joi.string().hex().length(24),
        })
    },
    checkProductByParam: {
        params: Joi.object({
            productId: Joi.string().hex().length(24),
        })
    },
}