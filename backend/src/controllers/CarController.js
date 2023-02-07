const AsyncHandler = require("../middlewares/AsyncHandler_Middleware");
const { CarSchema, FeatureSchema, BrandSchema, UserSchema } = require("../models/_IndexModel");
const { convert } = require("html-to-text");
const locationPWD = require("sub-vn");

class CarController {
    GetCars = AsyncHandler(async (req, res) => {
        res.json({ success: true, message: "List product" });
    });

    // Create Car
    PostCreateCar = AsyncHandler(async (req, res) => {
        const Email = req.Email;
        const user = await UserSchema.findOne({ Email });
        if (!user)
            return res.status(400).json({ success: false, message: "Lỗi xác thực tài khoản" });

        const data = req.body;
        data.ownerId = user._id;
        if (data.wd == 1) {
            data.wdShort = {
                price: data.price,
                priceOrigin: data.price,
            };
            data.price = 0;
            data.priceOrigin = 0;
        } else {
            data.priceOrigin = data.price;
        }
        const d = locationPWD
            .getDistrictsByProvinceCode(data.location.provinceId)
            .filter((item) => item.code == data.location.districtId);
        if (d.length < 1)
            return res.status(400).json({
                success: false,
                message: "Không thành công",
                data,
            });

        data.locationAddrS = d[0].full_name;
        data.status = 1;

        var newCar = new CarSchema({ ...data });
        await newCar.save();

        return res.status(200).json({
            success: true,
            message: "Thành công",
            newCar,
        });
    });

    GetCarDrive = AsyncHandler(async (req, res) => {
        const stype = req.params.stype.toLocaleLowerCase();
        const pos = +req.query.pos;
        if (stype != "sd" && stype != "wd") {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        const car = await CarSchema.find({ [stype]: 1 })
            .skip(pos)
            .limit(+filter.limit);
        if (!car)
            return res.status(404).json({ success: false, message: "Không tìm thấy xe nào " });

        res.status(200).json({ success: true, message: "Thành công", data: car });
    });

    GetCarFilter = AsyncHandler(async (req, res) => {
        const stype = req.params.stype.toLocaleLowerCase();
        const filter = req.query;
        // console.log(filter);
        let car;
        if (filter.provinceId == "") {
            // khac
            if (+filter.seat == 0) {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    seat: { $nin: [4, 5, 7] },
                    status: 2,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else if (+filter.seat == -100) {
                // all
                car = await CarSchema.find({
                    [stype]: 1,
                    status: 2,
                    price: { $gte: filter.price },
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    status: 2,
                    seat: +filter.seat,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            }
        } else if (filter.districtId == "") {
            // khac
            if (+filter.seat == 0) {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    "location.provinceId": filter.provinceId,
                    status: 2,
                    seat: { $nin: [4, 5, 7] },
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else if (+filter.seat == -100) {
                // all
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    status: 2,
                    "location.provinceId": filter.provinceId,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    "location.provinceId": filter.provinceId,
                    status: 2,
                    seat: +filter.seat,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            }
        } else if (filter.wardId == "") {
            // khac
            if (+filter.seat == 0) {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    "location.provinceId": filter.provinceId,
                    "location.districtId": filter.districtId,
                    status: 2,
                    seat: { $nin: [4, 5, 7] },
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else if (+filter.seat == -100) {
                // all
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    status: 2,
                    "location.provinceId": filter.provinceId,
                    "location.districtId": filter.districtId,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    status: 2,
                    "location.provinceId": filter.provinceId,
                    "location.districtId": filter.districtId,
                    seat: +filter.seat,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            }
        } else {
            // khac
            if (+filter.seat == 0) {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    "location.provinceId": filter.provinceId,
                    "location.districtId": filter.districtId,
                    "location.wardId": filter.wardId,
                    seat: { $nin: [4, 5, 7] },
                    status: 2,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else if (+filter.seat == -100) {
                // all
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    status: 2,
                    "location.provinceId": filter.provinceId,
                    "location.districtId": filter.districtId,
                    "location.wardId": filter.wardId,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            } else {
                car = await CarSchema.find({
                    [stype]: 1,
                    price: { $gte: filter.price },
                    status: 2,
                    "location.provinceId": filter.provinceId,
                    "location.districtId": filter.districtId,
                    "location.wardId": filter.wardId,
                    seat: +filter.seat,
                })
                    .skip(+filter.pos)
                    .limit(+filter.limit);
            }
        }

        res.status(200).json({ success: true, message: "Thành công", data: car });
    });

    // Get list car Self-driving or With-driving
    GetCarDrive = AsyncHandler(async (req, res) => {
        const stype = req.params.stype.toLocaleLowerCase();
        const pos = +req.query.pos;
        if (stype != "sd" && stype != "wd") {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        const car = await CarSchema.find({ [stype]: 1 })
            .skip(pos)
            .limit(+filter.limit);
        if (!car)
            return res.status(404).json({ success: false, message: "Không tìm thấy xe nào " });

        res.status(200).json({ success: true, message: "Thành công", data: car });
    });

    GetTopCar = AsyncHandler(async (req, res) => {
        const stype = req.params.stype.toLocaleLowerCase();

        if (stype != "sd" && stype != "wd") {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        const car = await CarSchema.find({ [stype]: 1, "rating.avg": { $gt: 4.0 } }).limit(12);
        if (!car)
            return res.status(404).json({ success: false, message: "Không tìm thấy xe nào " });

        if (stype == "wd") {
            return res.status(200).json({
                success: true,
                message: "Thành công",
                data: car,
            });
        }

        res.status(200).json({ success: true, message: "Thành công", data: car });
    });

    GetCarDetail = AsyncHandler(async (req, res) => {
        const carId = req.query.carId;
        const car = await CarSchema.findOne({ _id: carId });
        if (!car)
            return res.status(404).json({ success: false, message: "Không tìm thấy xe nào " });

        res.status(200).json({ success: true, message: "Thành công", data: car });
    });
    // Post BookingCarId
    PostBookingCarId = AsyncHandler(async (req, res) => {
        const Email = req.Email;
        const user = await UserSchema.findOne({ Email });
        if (!user)
            return res.status(400).json({ success: false, message: "Lỗi xác thực tài khoản" });

        const data = req.body;
        console.log(data);
        const car = await CarSchema.findOne({ _id: data.carId });
        if (!car)
            return res.status(404).json({ success: false, message: "Không tìm thấy xe nào " });

        if (user._id == car.ownerId)
            return res
                .status(400)
                .json({ success: false, message: "Chủ xe không được đặt xe của mình " });

        if (car.startTime <= data.startTimeBooking && data.startTimeBooking <= car.endTime) {
            car.renter.map((value, index) => {
                if (value.uid == user._id && (value.status != 20 || value.status != 25)) {
                    return res.status(200).json({
                        success: true,
                        message: "Đã xác nhận, vui lòng chờ chủ xe chấp nhận",
                        data: car,
                    });
                }
                if (
                    ((value.startTime <= data.startTimeBooking &&
                        data.startTimeBooking <= value.endTime) ||
                        (value.startTime <= data.endTimeBooking &&
                            data.endTimeBooking <= value.endTime)) &&
                    value.status != 1
                ) {
                    return res.status(400).json({
                        success: false,
                        message: "Xe đã được thuê, vui lòng chọn xe khác ",
                    });
                }
            });
            // return res.status(200).json({ success: true, message: "Thành công" });
            car.renter.push({
                uid: user._id,
                status: 1,
                startTime: data.startTimeBooking,
                endTime: data.endTimeBooking,
            });
            await car.save();
            res.status(200).json({
                success: true,
                message: "Đã xác nhận, vui lòng chờ chủ xe chấp nhận",
                data: car,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Xe đã ngừng hoạt động, vui lòng chọn xe khác ",
            });
        }
    });

    GetOwnerCars = AsyncHandler(async (req, res) => {
        const Email = req.Email;
        const user = await UserSchema.findOne({ Email });
        if (!user)
            return res.status(400).json({ success: false, message: "Lỗi xác thực tài khoản" });

        const data = req.query;

        const car = await CarSchema.find({ ownerId: user._id, status: { $ne: 4 } })
            .skip(+data.pos)
            .limit(+data.limit);

        res.json({ success: true, message: "List product", data: car });
    });

    RemoveOwnerCar = AsyncHandler(async (req, res) => {
        const Email = req.Email;
        const user = await UserSchema.findOne({ Email });
        if (!user)
            return res.status(400).json({ success: false, message: "Lỗi xác thực tài khoản" });

        const data = req.body;
        const car = await CarSchema.updateOne({ _id: data.carId }, { status: 4 });

        const newListCar = await CarSchema.find({ status: { $ne: 4 } })
            .skip(0)
            .limit(8);

        res.json({ success: true, message: "List product", data: { cars: newListCar } });
    });

    GetCarsManagement = AsyncHandler(async (req, res) => {
        // const Email = req.Email;
        // const user = await UserSchema.findOne({ Email });
        // if (!user)
        //     return res.status(400).json({ success: false, message: "Lỗi xác thực tài khoản" });

        const data = req.query;
        console.log(data);

        const car = await CarSchema.find(
            data.filterStatus == 0 ? { status: { $ne: 4 } } : { status: data.filterStatus }
        )
            .skip(+data.pos)
            .limit(+data.limit);

        res.json({ success: true, message: "List product", data: car });
    });

    PutCarId = async (req, res) => {
        const data = req.body;
        console.log(data);
        const car = await CarSchema.updateOne({ _id: data.carId }, { status: data.status });

        res.json({ success: true, message: "Thành công", car });
    };

    // Get feature
    GetFeature = AsyncHandler(async (req, res) => {
        const feature = await FeatureSchema.find({});
        if (!feature) {
            return res.status(404).json({ success: false, message: "Không tìm tính năng nào " });
        }
        res.json({ success: true, message: "Thành công", data: feature });
    });

    PostFeature = AsyncHandler(async (req, res) => {
        res.json({ success: true, message: "Thành công" });
    });

    // Get List brand car
    GetBrands = async (req, res) => {
        const brand = await BrandSchema.find({});
        if (!brand)
            return res.status(404).json({ success: false, message: "Không tìm mẫu xe nào " });
        res.json({ success: true, message: "Thành công", data: brand });
    };

    // Create brand
    PostBrand = async (req, res) => {
        res.json({ success: true, message: "post brand" });
    };

    // Delete carId
    DeleteCarId = async (req, res) => {
        res.json({ success: true, message: "1255421555" });
    };
}

module.exports = new CarController();
