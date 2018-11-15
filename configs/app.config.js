const dbConfig = require("./db.config"),
    routesConfig = require("../configs/router.config");

module.exports = {
    db: dbConfig,
    routes: routesConfig,
    env: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
    file: {
        models: 'models/*.js',
        controllers: 'controllers/*.js',
        services: 'services/*.js'
    },
    root: "http://localhost:3000",
}