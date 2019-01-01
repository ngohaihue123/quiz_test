const router = require('express').Router(),
    testController = require('../controllers/test.controller');
router.post('/add', testController.add);
router.get('/allTest', testController.get);
router.get('/class', testController.getAllTestByStudentClass)
router.get('/', testController.getById)
router.put("/update", testController.updateTest);
module.exports = router