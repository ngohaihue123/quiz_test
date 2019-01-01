const router = require('express').Router(),
    studentTestController = require('../controllers/student_test.controller');
router.post('/add', studentTestController.add);
router.get('/allTest', studentTestController.get);
router.get('/historyTests', studentTestController.getAllByStudentId)
router.get('/allStudents', studentTestController.getAllStudentDoTestByTestId)
router.get('/', studentTestController.getById)
router.put("/update", studentTestController.updateTest);
module.exports = router