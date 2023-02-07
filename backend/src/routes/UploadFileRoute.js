const express = require("express");
const router = express.Router();
const { UploadFileController } = require("../controllers/_IndexController");

router.post("/upload", UploadFileController.PostUpload);
router.get("/getfile", UploadFileController.GetListFiles);

module.exports = router;
