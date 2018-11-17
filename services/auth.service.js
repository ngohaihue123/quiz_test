const encryptionHelper = require("../helpers/encryption.helper"),
    dateTimeHelper = require("../helpers/date-time.helper"),
    appConfig = require('../configs/app.config'),
    User = require('mongoose').model('User'),
    Manager = require('mongoose').model('Manager');

// module.exports.generateProviderAccessToken = (userId, accessType) => {
//     let token = JSON.stringify({
//         userId: userId,
//         access: accessType,
//         expiredTime: dateTimeHelper.addMinuteFromNow(appConfig.providerToken.expiresIn)
//     });

//     return encryptionHelper.encrypt(token);
// }
module.exports.generateCustomerAccessToken = (customerId) => {
    let token = JSON.stringify({
        id: customerId,
        expiredTime: dateTimeHelper.addMinuteFromNow(appConfig.accessToken.expiresIn)
    });
    return encryptionHelper.encrypt(token);
}
module.exports.login = (username, password, type) => {
    console.log(username, password);
    return new Promise((resolve, reject) => {
        let query = {
            name: username,
            password: password
        };
        if (!type) {
            User.findOne(query)
                .exec((err, user) => {
                    if (user && user.isActive) {
                        let token = this.generateCustomerAccessToken(user._id);
                        let access = "user";
                        var p = {
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            accessToken: token,
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
            Manager.findOne(query).then(m => {
                if (m) {
                    let accessToken = this.generateManagerAccessToken(m._id, m.role);
                    var p = {
                        username: m.username,
                        email: m.email,
                        role: m.role != undefined ? m.role : RoleType.Contributor,
                        accessToken: accessToken
                    };

                    resolve(p)

                } else {
                    resolve(false);
                }
            }).catch(err => reject(err));
        }
    });
}