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
    accessToken: {
        expiresIn: 1440 // minutes = 1 day
    },
    encryption: {
        password: 'vs34X?T7BDj7-PUhYCq5w%w',
        salt: 'B5#9p5WcEPcZSJeSzFm&7Cs'
    }
}