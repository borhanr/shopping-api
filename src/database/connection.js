const mongoose = require('mongoose');
const config = require('../../config');

module.exports = class DatabaseConnection {

    static connectMongodb() {
        const {url, options} = config.MONGOOSE_CONFIG;
        mongoose.Promise = global.Promise;
        mongoose.connect(url, options)
    }

    // Disconnect Mongodb connection in seeding
    static disconnectMongodb() {
        mongoose.connection.close()
    }

    static getMongoModels() {
        return require('./models');
    }
}

