const encryptionHelper = require("../helpers/encryption.helper"),
    dateTimeHelper = require("../helpers/date-time.helper"),
    appConfig = require('../configs/app.config'),
    User = require('mongoose').model('User'),
    Teacher = require('mongoose').model('Teacher');

module.exports.generateUserAccessToken = (customerId) => {
    let token = JSON.stringify({
        id: customerId,
        expiredTime: dateTimeHelper.addMinuteFromNow(appConfig.accessToken.expiresIn)
    });
    return encryptionHelper.encrypt(token);
}
module.exports.login = (gmail, password, type) => {
    return new Promise((resolve, reject) => {
        let query = {
            gmail: gmail,
            password: password
        };
        if (type == "user") {
            User.findOne(query)
                .exec((err, user) => {
                    if (user && user.isActive) {
                        let token = this.generateUserAccessToken(user._id);
                        let access = "user";
                        var p = {
                            name: user.name,
                            gmail: user.gmail,
                            class: user.class,
                            idStudent: user._id,
                            accessToken: token
                        };

                        user.tokens.push({
                            access,
                            token
                        });

                        user.save().then(() => resolve(p));

                    } else {
                        resolve(false);
                    }
                })
        } else {
            Teacher.findOne(query).then(m => {
                if (m) {
                    let accessToken = this.generateUserAccessToken(m._id);
                    let access = "teacher"
                    var p = {
                        idTeacher: m._id,
                        gmail: m.username,
                        accessToken: accessToken
                    };
                    m.tokens.push({
                        access,
                        accessToken
                    })

                    resolve(p)

                } else {
                    resolve(false);
                }
            }).catch(err => reject(err));
        }
    });
}