const encryptionHelper = require("../helpers/encryption.helper"),
    dateTimeHelper = require("../helpers/date-time.helper");

module.exports.generateProviderAccessToken = (userId, accessType) => {
    let token = JSON.stringify({
        userId: userId,
        access: accessType,
        expiredTime: dateTimeHelper.addMinuteFromNow(appConfig.providerToken.expiresIn)
    });

    return encryptionHelper.encrypt(token);
}

module.exports.login = (username, password) => {
    type = 1;
    return new Promise((resolve, reject) => {
        let query = {
            username: username,
            password: password
        };
        if (!type) {
            User.findOne(query)
                .populate('currency')
                .exec((err, provider) => {
                    if (provider && provider.isActive) {
                        let access = 'auth';
                        let token = this.generateProviderAccessToken(provider._id, access);
                        var p = {
                            username: provider.username,
                            name: provider.name,
                            email: provider.email,
                            accessToken: token,
                        };

                        provider.tokens.push({
                            access,
                            token
                        });

                        provider.save().then(() => resolve(p));

                    } else {
                        resolve(false);
                    }
                }).catch(err => reject(err));
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