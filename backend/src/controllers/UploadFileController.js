const { UploadFileMiddleware, AsyncHandler } = require("../middlewares/_IndexMiddleware");
var fs = require("fs");

class UploadFileController {
    PostUpload = async (req, res) => {
        try {
            var filesBase64 = [];
            await UploadFileMiddleware(req, res);

            if (!req.files["avatar"]) {
                return res.status(400).send({ success: false, message: "Please upload a file!" });
            }

            for (var i = 0; i < req.files["avatar"].length; i++) {
                filesBase64.push({
                    fileName: req.files["avatar"][i].originalname,
                    base64: new Buffer.from(fs.readFileSync(req.files["avatar"][i].path)).toString("base64"),
                });
                // fs.unlink(req.files["avatar"][i].path);
                console.log("File Name : " + filesBase64[i].fileName);
                console.log("Base 64 : " + filesBase64[i].base64.substring(0, 50));
            }
            console.log("Photo Uploaded");

            res.json({ success: true, message: "Files has been uploaded." });
        } catch (error) {
            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                return res.json({ success: false, message: "Too many files to upload." });
            }
            return res.json({ success: false, message: `Error when trying upload many files: ${error}` });
        }
    };

    GetListFiles = AsyncHandler((req, res) => {
        res.json({ success: false, message: "chua xu ly" });
        // const directoryPath = __basedir + "uploads/";
        // fs.readdir(directoryPath, function (err, files) {
        //     if (err) {
        //         res.status(500).json({
        //             message: "Unable to scan files!",
        //         });
        //     } else {
        //         let fileInfos = [];
        //         files.forEach((file) => {
        //             fileInfos.push({
        //                 name: file,
        //                 url: baseUrl + file,
        //             });
        //         });
        //         res.status(200).json(fileInfos);
        //     }
        // });
    });

    download = AsyncHandler((req, res) => {
        const fileName = req.params.name;
        const directoryPath = __basedir + "uploads/";
        res.download(directoryPath + fileName, fileName, (err) => {
            if (err) {
                res.status(500).json({
                    message: "Could not download the file. " + err,
                });
            }
        });
    });
}
module.exports = new UploadFileController();
