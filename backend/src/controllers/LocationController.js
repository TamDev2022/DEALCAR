const { AsyncHandler } = require("../middlewares/_IndexMiddleware");
const {
    getProvinces,
    getDistricts,
    getWards,
    getDistrictsByProvinceCode,
    getWardsByDistrictCode,
    getWardsByProvinceCode,
} = require("sub-vn");

class LocationController {
    GetProvinces = async (req, res) => {
        var data = getProvinces();
        data[0] != undefined
            ? res.json({ success: true, data })
            : res.json({ success: false, message: "There code is not available" });
    };

    GetDistricts = async (req, res) => {
        var data = getDistricts(req.query.code);
        data[0] != undefined || !data[0]
            ? res.json({ success: true, data })
            : res.json({ success: false, message: "There code is not available" });
    };

    GetWards = async (req, res) => {
        var data = getWards((req.query.code));
        data[0] != undefined
            ? res.json({ success: true, data })
            : res.json({ success: false, message: "There code is not available" });
    };

    GetDistrictsByProvince = AsyncHandler(async (req, res) => {
        var data = getDistrictsByProvinceCode(req.query.code);
        data[0] != undefined
            ? res.json({ success: true, data })
            : res.json({ success: false, message: "There code province is not available" });
    });
    GetWardsByDistrict = async (req, res) => {
        var data = getWardsByDistrictCode(req.query.code);
        data[0] != undefined
            ? res.json({ success: true, data })
            : res.json({ success: false, message: "There code district is not available" });
    };
    GetWardsByProvince = async (req, res) => {
        var data = getWardsByProvinceCode(req.query.code);
        data[0] != undefined
            ? res.json({ success: true, data })
            : res.json({ success: false, message: "There code province is not available" });
    };
}

module.exports = new LocationController();
