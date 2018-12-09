const User = require('mongoose').model('User'),
    contants = require('../static/constants'),
    MessageConstants = contants.MessageConstants;
_ = require("lodash");

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
                dateCreate: dateCreate
            });
            user.save().then(() => resolve({
                success: true,
                message: MessageConstants.SaveSuccessfully
            })).catch(err => resolve({ success: false, message: err }));
        });
    };
    update(item) {
        return new Promise((resolve) => {
            User.findById(item._id).then(user => {
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
    getAllByClass(criteria, studentClass) {
        return new Promise((resolve) => {
            let query = {
                isActive: true,
                class: studentClass
            };
            User.find(query).select({
                _id: 1,
                name: 1,
                gmail: 1,
                class: 1,
                scholl: 1,

            }).then((students) => {
                let results = [];
                if (!criteria.searchText) {
                    results = students;
                } else { }
                let sortedResult = _.sortBy(results, x => x.name);
                let selectedItems = _.chain(sortedResult)
                    .drop(criteria.itemPerPage * (criteria.currentPage - 1))
                    .take(criteria.itemPerPage)
                    .value();

                criteria.totalPage = Math.ceil(sortedResult.length / criteria.itemPerPage);
                resolve({
                    success: true,
                    data: {
                        criteria: criteria,
                        students: selectedItems
                    }
                });

            })
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
    deleteById(id) {
        return new Promise((resolve) => {
            User.find(id).then(user => {
                if (user) {
                    user.isActive = false;
                    user.save().then(() => {
                        resolve({ success: true, message: MessageConstants.DeleteSuccessfully });
                    }).catch((err) => resolve({ success: false, message: err }))
                } else {
                    resolve({ success: false })
                }
            }).catch(err => resolve({ success: false, message: err }))
        })
    }
}
module.exports = new UserService;