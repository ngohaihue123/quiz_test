const fileService = require('../services/file.service');
const uploadFolder = __basedir + '/file/test/upload/bg/';
module.exports.uploadFile = (req, res, next) => {
    fileService.uploadFile(req).then(file => {
        res.json(file);
    }).catch(err => next(err));
}
exports.downloadFile = (req, res) => {
    let filename = req.query.filename;
    res.download(uploadFolder + filename);
}