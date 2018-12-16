const fileService = require('../services/file.service');
module.exports.uploadFile = (req, res, next) => {
    fileService.uploadFile(req).then(file => {
        res.json(file);
    }).catch(err => next(err));
}