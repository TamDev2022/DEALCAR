const AsyncHandler = require("../middlewares/AsyncHandler_Middleware");
const { CarSchema } = require("../models/_IndexModel");
const { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } = require("sub-vn");
const City = require("../constant/City.json");

class HomeController {
    GetHome = AsyncHandler(async (req, res) => {
        const provinces = getProvinces();

        const sdDes = await CarSchema.aggregate([
            { $match: { sd: 1 } },
            {
                $group: {
                    _id: "$location.provinceId",
                    totalCars: { $sum: 1 },
                },
            },
        ])
            .sort({ totalCars: "desc" })
            .limit(12);

        const wdDes = await CarSchema.aggregate([
            { $match: { wd: 1 } },
            {
                $group: {
                    _id: "$location.provinceId",
                    totalCars: { $sum: 1 },
                },
            },
        ])
            .sort({ totalCars: "desc" })
            .limit(12);

        const TopDesDrive = (Drive) => {
            const res = City.map((elem) => {
                let result = Drive.find((item) => item["_id"] == elem["code"]);
                if (!result) result = { _id: "0", totalCars: 0 };
                return {
                    ...elem,
                    ...result,
                };
            });
            return res;
        };

        const sdTopDes = TopDesDrive(sdDes);
        const wdTopDes = TopDesDrive(wdDes);

        // if (!sdTopDes || !wdTopDes)
        //     return res.status(400).json({ success: false, message: "Get topDes failed" });

        res.status(200).json({
            success: true,
            message: "Get HomePage",
            sdTopDes,
            wdTopDes,
        });
    });
}

module.exports = new HomeController();
