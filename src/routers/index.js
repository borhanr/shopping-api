const fs = require('fs')
const path = require("path");

const routersPath = path.resolve(__dirname, './')
const routes = []

// Automatically read all routers and export as an array
fs.readdirSync(routersPath)
    .forEach((file) => {
        if (file !== 'index.js') {
            const splitFile = file.split('.').slice(0, -1);
            file = splitFile.join('.');
            const route = require(path.join(routersPath, file));
            routes.push(route)
        }
    })

module.exports = routes;