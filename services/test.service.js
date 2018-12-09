const appConfig = require('../configs/app.config'),
    constants = require('../static/constants'),
    MessageContants = constants.MessageConstants
Test = require('mongoose').model('Test');
class TestService {
    add() {

    }
    update(id) {

    }
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
    }
    getAllByIdTeacher(teacher) {
        return new Promise((resolve) => {
            Test.find({ teacher: teacher }).then(data => {
                if (data) {
                    resolve({ success: true, data: data })
                } else {
                    resolve({ success: false })
                }
            }).catch(err => resolve({ success: false, message: err }))
        })
    }
    getById(id) {

    }
}