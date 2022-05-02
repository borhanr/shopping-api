const fs = require('fs')
const path = require("path");

const modelsPath = path.resolve(__dirname, './')

// Automatically read all models and export as an object
fs.readdirSync(modelsPath)
    .forEach((file) => {
        if (file !== 'index.js') {
            const splitFile = file.split('.').slice(0, -1);
            file = splitFile.join('.');
            const model = require(path.join(modelsPath, file));
            exports[model.modelName] = model;
        }
    })
