const fs = require('fs'),
    path = require('path'),
    uuid = require('uuid'),
    // request = require('request'),
    // moment = require('moment'),
    // _ = require('lodash'),
    appConfig = require('../configs/app.config');
module.exports.uploadFile = (req, res, next) => {
    var managerId = req.body.managerId;
    var type = req.query.type;
    var fstream;
    var saveTo = '';
    var fileNameOut = '';
    if (req.busboy) {
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log(filename);
            // check directory exists
            var directoryPath = path.join(__dirname, '../file') + '/test/upload/' + type;
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }
            //
            fileNameOut = managerId + "_" + uuid.v4() + path.extname(filename);
            saveTo = path.join(__dirname, '../file') + localPath;
            fstream = fs.createWriteStream(saveTo);
            file.pipe(fstream);
        });
        req.busboy.on('finish', function () {
            if (appConfig.stage == 'dev')
                res.json({
                    success: true,
                    data: fileNameOut
                });


        });

        req.pipe(req.busboy);
    } else {
        res.json({
            success: true,
            data: null
        });
    }
}