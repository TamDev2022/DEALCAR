const util = require("util");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(`${__dirname}/../../uploads`));
    },
    filename: (req, file, callback) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
            return callback(message, null);
        }

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        var filename = file.fieldname + "-" + uniqueSuffix + "-" + `${file.originalname}`;

        callback(null, filename);
    },
});

var uploadFiles = multer({ storage: storage }).fields([
    { name: "avatar", maxCount: 3 },
    { name: "imageCar", maxCount: 8 },
]);

var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
