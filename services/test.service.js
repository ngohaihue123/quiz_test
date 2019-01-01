const appConfig = require('../configs/app.config'),
    constants = require('../static/constants'),
    MessageContants = constants.MessageConstants,
    Test = require('mongoose').model('Test');
class TestService {
    add(test) {
        return new Promise((resolve) => {
            const dateCreate = new Date();
            let testModel = new Test({
                title: test.title,
                time: test.time,
                dateCreate: dateCreate,
                fileTest: test.fileTest,
                answer: test.answer,
                class: test.class,
                numberQuestion: test.numberQuestion
            });
            testModel.save().then(() => resolve({
                success: true,
                message: MessageContants.SaveSuccessfully
            })).catch(err => resolve({ success: false, message: err }));
        });
    }
    update(item) {
        return new Promise((resolve) => {
            Test.findById(item._id).then(test => {
                if (test) {
                    test.title = item.title;
                    test.answer = item.answer;
                    test.fileTest = item.fileTest;
                    test.studentClass = item.studentClass;
                    test.numberQuestion = item.numberQuestion;
                    test.time = item.time;
                    test.save().then(() => {
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

    deleteById(id) {
        return new Promise((resolve) => {
            Test.find(id).then(test => {
                if (test) {
                    test.idActive = false
                    test.save().then(() => {
                        resolve({ success: true, message: MessageContants.DeleteSuccessfully });
                    }).catch(err => resolve({ success: false, message: err }))
                } else {
                    resolve({ success: false })
                }
            }).catch(err => resolve({ success: false, message: err }))
        })
    };

    getAllTestByStudentClass(criteria, studentClass) {
        return new Promise((resolve) => {
            let query = {
                isDeleted: false,
                class: studentClass
            };
            Test.find(query).select({
                _id: 1,
                title: 1,
                fileTest: 1,
                numberQuestion: 1,
                time: 1,
                answer: 1,
                dateCreate: 1,

            }).then((tests) => {
                let results = [];
                if (!criteria.searchText) {
                    results = tests;
                } else { }
                let sortedResult = _.sortBy(results, x => -x.dateCreate);
                let selectedItems = _.chain(sortedResult)
                    .drop(criteria.itemPerPage * (criteria.currentPage - 1))
                    .take(criteria.itemPerPage)
                    .value();

                criteria.totalPage = Math.ceil(sortedResult.length / criteria.itemPerPage);
                resolve({
                    success: true,
                    data: {
                        criteria: criteria,
                        tests: selectedItems
                    }
                });

            })
                .catch((err) => resolve({
                    success: false,
                    message: err
                }));
        })
    }
    getAllByTeacherIdAndClass(criteria, studentClass) {
        return new Promise((resolve) => {
            let query = {
                isDeleted: false,
                class: studentClass
            };
            Test.find(query).select({
                _id: 1,
                title: 1,
                fileTest: 1,
                answer: 1,
                dateCreate: 1,

            }).then((tests) => {
                let results = [];
                if (!criteria.searchText) {
                    results = tests;
                } else { }
                let sortedResult = _.sortBy(results, x => -x.dateCreate);
                let selectedItems = _.chain(sortedResult)
                    .drop(criteria.itemPerPage * (criteria.currentPage - 1))
                    .take(criteria.itemPerPage)
                    .value();

                criteria.totalPage = Math.ceil(sortedResult.length / criteria.itemPerPage);
                resolve({
                    success: true,
                    data: {
                        criteria: criteria,
                        tests: selectedItems
                    }
                });

            })
                .catch((err) => resolve({
                    success: false,
                    message: err
                }));
        })
    }
    getById(id) {
        return new Promise((resolve) => {
            Test.findById(id).then(test => {
                if (test) {
                    resolve({ success: true, data: test });
                } else {
                    resolve({ success: false });
                }
            }).catch(err => resolve({ success: false, message: err }));
        });
    };
}
module.exports = new TestService;