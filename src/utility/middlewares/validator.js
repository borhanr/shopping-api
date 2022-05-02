const {validate} = require('express-validation')

// Disable aboutEarly option for all validators (Routers use this module)
module.exports = {
    validate: (schema, options, joiRoot) => {
        return validate(schema, options, {abortEarly: false, ...joiRoot})
    }
}