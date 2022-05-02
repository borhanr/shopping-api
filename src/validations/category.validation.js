const {Joi} = require('express-validation')

module.exports = {
    getCategory: {
        params: Joi.object({
            categoryId: Joi.string().hex().length(24),
        })
    },
}