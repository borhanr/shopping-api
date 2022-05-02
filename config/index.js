const config = {
    MONGOOSE_CONFIG: {
        url: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
};


module.exports = config