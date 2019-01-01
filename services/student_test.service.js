const appConfig = require('../configs/app.config'),
    constants = require('../static/constants'),
    MessageContants = constants.MessageConstants,
    StudentTest = require('mongoose').model('StudentTest'),
    testService = require('./test.service');
class TestService {
    add(studentTest) {
        return new Promise((resolve) => {
            testService.getById(studentTest.test).then(test => {
                const testAnswer = test.data.answer;
                const studentAnswer = studentTest.answer;
                let result = 0;
                let i;
                for (i = 0; i < testAnswer.length; i++) {
                    if (testAnswer[i].value == studentAnswer[i].value && studentAnswer[i].value != 0) {
                        result++;
                    }
                }
                const dateCreate = new Date();
                let testModel = new StudentTest({
                    student: studentTest.student,
                    test: studentTest.test,
                    dateCreate: dateCreate,
                    answer: studentTest.answer,
                    result: result
                });
                const reponseData = {
                    studentAnswer: studentTest.answer,
                    testAnswer: testAnswer,
                    result: result
                }
                testModel.save().then(() => resolve({
                    success: true,
                    data: reponseData
                })).catch(err => resolve({ success: false, message: err }));

            })



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
                    test.numberQuesttion = test.numberQuesttion;
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

    getAllByStudentId(criteria, studentId) {
        return new Promise((resolve) => {
            let query = {
                isDeleted: false,
                student: studentId
            };
            StudentTest.find(query).select({
                result: 1,
                dateCreate: 1,

            }).populate('test', 'title numberQuestion').
                then((tests) => {
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

    getAllStudentDoTestByTestId(criteria, testId) {
        return new Promise((resolve) => {
            let query = {
                isDeleted: false,
                test: testId
            };
            StudentTest.find(query).select({
                result: 1,
                dateCreate: 1,

            }).populate('student', 'name').
                then((tests) => {
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
                let sortedResult = _.sortBy(results, x => x.dateCreate);
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