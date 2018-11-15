
const mongoose = require("mongoose"),
    pathHelper = require("../helpers/path.helper"),
    appConfig = require('./app.config');
module.exports.loadModels = () => {
    let modelPaths = pathHelper.getGlobbedPaths(appConfig.file.models);
    modelPaths.forEach((modelPath) => require(path.resolve(modelPath)));
};
module.exports.connect = () => {
    mongoose.Promise = global.Promise;
    return new Promise((resolve, reject) => {
        let db = mongoose.connect(appConfig.db.uri, appConfig.db.options).then(() => {
            console.log("connected");
            resolve(db);
        }).catch((err) => {
            console.log("err" + err);
            reject(err);
        });
    });
};