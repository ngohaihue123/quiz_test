appConfig=require('./app.config');
const mongoose=require("mongoose");
mongoose.Promise = global.Promise;
module.exports.connect = () => {
    mongoose.Promise = global.Promise;
    return new Promise((resolve, reject) => {
        let db = mongoose.connect(appConfig.db.uri, appConfig.db.options).then(() => {
            console.log("connected");
            resolve(db);
        }).catch((err) => {
            console.log("err"+err);
            reject(err);
        });
    });
};