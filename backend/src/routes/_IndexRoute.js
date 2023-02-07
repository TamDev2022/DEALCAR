const multer = require("multer");
const { ErrorHandler, NotFound } = require("../middlewares/_IndexMiddleware");
const AuthRoute = require("./AuthRoute");
const LocationRoute = require("./LocationRoute");
const CarRoute = require("./CarRoute");
const UploadFileRoute = require("./UploadFileRoute");
const { HomeController } = require("../controllers/_IndexController");

const upload = multer({ dest: "uploads/" });

function Route(app) {
    // Add headers before the routes are defined
    app.get("/api/totaldrivecity", HomeController.GetHome);
    app.use("/api/auth", AuthRoute);
    app.use("/api/car", CarRoute);
    app.use("/api/loc", LocationRoute);
    app.use("/api/file", UploadFileRoute);
    app.use(NotFound);
    app.use(ErrorHandler);
}

module.exports = Route;
