const fs = require('fs'),
    path = require('path'),
    uuid = require('uuid'),
    appConfig = require('../configs/app.config');
class FileService {
    uploadFile(req) {
        return new Promise((resolve) => {
            var managerId = req.body.managerId;
            var type = req.query.type;
            let fstream;
            let saveTo = '';
            let fileNameOut = '';
            if (req.busboy) {
                req.busboy.on('file', function (fieldname, file, filename) {
                    var directoryPath = path.join(__dirname, '../file') + '/test/upload/' + type;
                    if (!fs.existsSync(directoryPath)) {
                        fs.mkdirSync(directoryPath);
                    }
                    fileNameOut = managerId + "_" + uuid.v4() + path.extname(filename);
                    let localPath = '/test/upload/' + type + '/' + fileNameOut;
                    saveTo = path.join(__dirname, '../file') + localPath;
                    fstream = fs.createWriteStream(saveTo);
                    file.pipe(fstream);
                });
                req.busboy.on('finish', function () {
                    resolve({
                        success: true,
                        data: fileNameOut
                    });
                    // send a copy to Gonjoy.io for better performance in vietnam
                });
                req.pipe(req.busboy);
            }
        })
    }
}
module.exports = new FileService;