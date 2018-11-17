const User = require('mongoose').model('User'),
    contants = require('../static/constants'),
    MessageConstants = contants.MessageConstants;

class UserService {
    add(item) {
        return new Promise((resolve) => {
            const dateCreate = new Date();
            let user = new User({
                name: item.name,
                gmail: item.gmail,
                password: item.password,
                class: item.class,
                school: item.scholl,
                dateCreate: new Date(),
            });
            user.save().then(() => resolve({
                success: true,
                message: MessageConstants.SaveSuccessfully
            })).catch(err => resolve({ success: false, message: err }));
        });
    };
    update(item) {
        return new Promise((resolve) => {
            User.findById(item_id).then(user => {
                if (user) {
                    user.name = item.name;
                    user.gmail = item.gmail;
                    user.class = item.class;
                    user.scholl = item.scholl;
                    user.save().then(() => {
                        resolve({
                            success: true,
                            message: MessageConstants.SaveSuccessfully
                        });
                    }).catch(err => resolve({ success: false, message: err }));
                } else {
                    resolve({ success: false });
                }


            }).catch(err => resolve({ success: false, message: err }));
        });
    };
    getAll() {
        return new Promise((resolve) => {
            let query = {
                isActive: false,
            };
            User.find(query).select({
                _id: 1,
                name: 1,
                gmail: 1,
                class: 1,
                scholl: 1,

            }).then((result) => resolve({ success: true, data: result }))
                .catch((err) => resolve({
                    success: false,
                    message: err
                }));
        })
    };
    getById(id) {
        return new Promise((resolve) => {
            User.findById(id).then(user => {
                if (user) {
                    resolve({ success: true, data: user });
                } else {
                    resolve({ success: false });
                }
            }).catch(err => resolve({ success: false, message: err }));
        });
    };
}
module.exports = new UserService;