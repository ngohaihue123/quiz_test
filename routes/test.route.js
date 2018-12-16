const router = require('express').Router(),
    testController = require('../controllers/test.controller');
router.post('/add', testController.add);
router.get('/allTest', testController.get);
router.get('/', testController.getById)

module.exports = router