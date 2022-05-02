const {Joi} = require('express-validation')

module.exports = {
    signup: {
        body: Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
        })
    },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
    }
}