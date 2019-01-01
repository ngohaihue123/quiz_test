const studentTestService = require('../services/student_test.service');
module.exports.add = (req, res, next) => {
    studentTestService.add(req.body).then(data => {
        res.json(data);
    }).catch(err => next(err));
}
module.exports.get = (req, res, next) => {
    let criteria = {
        searchText: req.query.searchText,
        itemPerPage: parseInt(req.query.itemPerPage),
        currentPage: parseInt(req.query.currentPage)
    };
    studentClass = req.query.class
    testService.getAllByTeacherIdAndClass(criteria, studentClass)
        .then(rs => res.json(rs))
        .catch((err) => next(err));

}
module.exports.getAllByStudentId = (req, res, next) => {
    let criteria = {
        searchText: req.query.searchText,
        itemPerPage: parseInt(req.query.itemPerPage),
        currentPage: parseInt(req.query.currentPage)
    };
    const studentId = req.query.studentId
    studentTestService.getAllByStudentId(criteria, studentId)
        .then(rs => res.json(rs))
        .catch((err) => next(err));

}
module.exports.getAllStudentDoTestByTestId = (req, res, next) => {
    let criteria = {
        searchText: req.query.searchText,
        itemPerPage: parseInt(req.query.itemPerPage),
        currentPage: parseInt(req.query.currentPage)
    };
    const testId = req.query.testId
    studentTestService.getAllStudentDoTestByTestId(criteria, testId)
        .then(rs => res.json(rs))
        .catch((err) => next(err));

}
module.exports.getById = (req, res, next) => {
    testService.getById(req.query.id)
        .then(rs => res.json(rs))
        .catch((err) => next(err));
}
module.exports.updateTest = (req, res, next) => {
    testService.update(req.body)
        .then(rs => res.json(rs))
        .catch((err) => next(err));
}