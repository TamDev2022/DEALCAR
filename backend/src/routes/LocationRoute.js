const express = require("express");
const router = express.Router();
const { LocationController } = require("../controllers/_IndexController");

router.get("/provinces", LocationController.GetProvinces);
router.get("/districts", LocationController.GetDistricts);
router.get("/wards", LocationController.GetWards);
router.get("/districts-by-province", LocationController.GetDistrictsByProvince);
router.get("/wards-by-district", LocationController.GetWardsByDistrict);
router.get("/wards-by-province", LocationController.GetWardsByProvince);

module.exports = router;
