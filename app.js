const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routers/user.router');
const appConfig = require('./configs/app.config');
chalk = require('chalk');
mongooseConfig = require('./configs/mongoose.config');
const app = express();
app.use('/user', user);
console.log("1");
// app.use(express.bodyParser());
app.use(bodyParser.json());
console.log("2");
// app.use(bodyParser.json({limit:5120000, type:'application/json'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.methodOverride());

module.exports.init = () => {//es6
    return new Promise((resolve, reject) => {
        mongooseConfig.connect().then((db) => {
            resolve(db);
        }).catch((err) => {
            reject(err);
        });
    });
}
module.exports.start = () => {
    this.init().then((db) => {
        app.listen(appConfig.env.port, () => {
            console.log(chalk.green('Server started on ' + appConfig.env.host + ':' + appConfig.env.port));
        });
       
    }).catch((err) => {
        console.log(chalk.red('Cannot start server. Err' + err));
        console.log(chalk.red(err.stack));
    });

}