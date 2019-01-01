const router = require('express').Router(),
    fileController = require('../controllers/file.controller');
router.post('/upload', fileController.uploadFile);
router.get('/file', fileController.downloadFile);
module.exports = router