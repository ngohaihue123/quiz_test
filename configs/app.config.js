dbConfig=require("./db.config");
module.exports ={
    db: dbConfig,
    env: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
}