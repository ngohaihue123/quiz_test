const router = require('express').Router(),
    teacherController = require('../controllers/teacher.controller');
router.post('/file/upload', teacherController.uploadFile);
module.exports = router