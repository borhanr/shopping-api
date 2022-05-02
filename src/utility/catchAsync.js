// Global function to use in controllers and avoid repeated try-and-catch cycles
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(err)
        });
    };
};