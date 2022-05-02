const {ValidationError} = require('express-validation')
const {TokenExpiredError, JsonWebTokenError} = require('jsonwebtoken')
const HttpResponse = require('../http')

// Global error handler (There should be a list of all possible errors)
module.exports = (err, req, res, next) => {
    if (err instanceof ValidationError)
        return res.status(400)
            .json(new HttpResponse(
                400,
                err.message,
                err.details,
            ))

    else if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError)
        return res.status(401)
            .json(new HttpResponse(
                401,
                err.message
            ))

    else
        return res.status(500)
            .json(new HttpResponse(
                500,
                err.message,
            ))
}