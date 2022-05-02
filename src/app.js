const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require("cors");
const compression = require('compression');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const databaseConnection = require('./database/connection')
const routes = require('./routers')
const HttpResponse = require('./utility/http')
const errorHandler = require('./utility/error')

class Application {
    constructor() {
        this.app = express();
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
        this.catchUnhandledRoutes();
        this.setErrorHandler();
    };

    setupExpress() {
        http.createServer(this.app);
        this.app.listen(process.env.APPLICATION_PORT, () => console.log(`The server is listening port ${process.env.APPLICATION_PORT}`));
    };

    setMongoConnection() {
        databaseConnection.connectMongodb()
        this.models = databaseConnection.getMongoModels()
    };

    // Set middlewares
    setConfig() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: false}))
        this.app.use(cookieParser(process.env.COOKIE_SECRETKEY));
        this.app.use(mongoSanitize());
        this.app.use(xss());
        this.app.use(compression());
        this.app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
    };

    setRouters() {
        // Create an object for each route class in the routers folder and use it in the application
        routes.forEach((route) => {
            const router = new route(this.models)
            this.app.use('/api/v1', router.router)
        })
    };

    catchUnhandledRoutes() {
        this.app.all('*', (req, res, next) => {
            res.status(404)
                .json(new HttpResponse(
                    404,
                    `Can't find ${req.originalUrl} on this server!`,
                ));
        });
    };

    setErrorHandler() {
        this.app.use(errorHandler)
    };
}

module.exports = Application;