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
module.exports.generateUserAccessToken = (customerId) => {
    let token = JSON.stringify({
        id: customerId,
        expiredTime: dateTimeHelper.addMinuteFromNow(appConfig.accessToken.expiresIn)
    });
    return encryptionHelper.encrypt(token);
}
module.exports.login = (gmail, password, type) => {
    console.log(gmail, password);
    return new Promise((resolve, reject) => {
        let query = {
            gmail: gmail,
            password: password
        }; // mở chrom t với
        if (type == "user") {
            User.findOne(query)
                .exec((err, user) => {
                    if (user && user.isActive) {
                        let token = this.generateUserAccessToken(user._id);
                        let access = "user";
                        var p = {
                            name: user.name,
                            gmail: user.gmail,
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