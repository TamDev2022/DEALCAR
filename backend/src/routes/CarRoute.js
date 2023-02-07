const express = require("express");
const router = express.Router();
const { CarController } = require("../controllers/_IndexController");
const { AuthJWTMiddleware } = require("../middlewares/_IndexMiddleware");
router.get("/", CarController.GetCars);
router.get("/filter/:stype", CarController.GetCarFilter);
router.get("/topcar/:stype", CarController.GetTopCar);
router.get("/detail", CarController.GetCarDetail);
router.post("/booking", AuthJWTMiddleware.VerifyAccessToken, CarController.PostBookingCarId);
router.post("/create-car", AuthJWTMiddleware.VerifyAccessToken, CarController.PostCreateCar);
router.get(
    "/admin/manage-car",
    AuthJWTMiddleware.VerifyAccessToken,
    CarController.GetCarsManagement
);
router.put("/setting/update", AuthJWTMiddleware.VerifyAccessToken, CarController.PutCarId);
router.put("/owner/remove-car", AuthJWTMiddleware.VerifyAccessToken, CarController.RemoveOwnerCar);
router.get("/owner", AuthJWTMiddleware.VerifyAccessToken, CarController.GetOwnerCars);
router.get("/feature", CarController.GetFeature);
router.post("/feature", CarController.PostFeature);
router.get("/brand", CarController.GetBrands);
router.post("brand", CarController.PostBrand);
router.get("/:stype", CarController.GetCarDrive);

module.exports = router;
