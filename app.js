mongooseConfig=require('./configs/mongoose.config');
module.exports.start = () =>{//es6
    return new Promise((resolve, reject) => {
        mongooseConfig.connect().then((db) => {
            resolve(db);
        }).catch((err) => {
            reject(err);
        });
    });
}

// module.exports.start = function(){

// }