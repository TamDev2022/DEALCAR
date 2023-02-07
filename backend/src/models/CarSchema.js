const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);

const CarSchema = new Schema(
    {
        name: { type: String, require: true },
        ownerId: { type: String, required: true },
        renter: [
            {
                uid: { type: String, required: true },
                status: { type: Number, required: true },
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
            },
        ],

        wd: { type: Number, required: true, default: 0 },
        sd: { type: Number, required: true, default: 0 },

        location: {
            provinceId: { type: String, required: true },
            districtId: { type: String, required: true },
            wardId: { type: String, required: true },
            street: { type: String },
        },
        locationAddrS: { type: String },
        papers: [
            {
                id: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        photos: [
            {
                id: { type: String, required: true },
                thumbUrl: { type: String, required: true },
                fullUrl: { type: String, required: false },
            },
        ],
        price: { type: Number, required: true, default: 0 },
        priceOrigin: { type: Number, required: true, default: 0 },
        totalDiscountPercent: { type: Number, required: true, default: 0 },
        status: { type: Number, required: true, default: 0 },
        seat: { type: Number, required: true, default: 9 },
        brand: {
            id: { type: Number, required: true },
            name: { type: String, require: true },
        },
        totalTrips: { type: Number, required: true, default: 0 },
        optionsFuel: { type: Number, required: true, default: 0 },
        optionsFuelConsumption: { type: Number, required: true, default: 0 },
        optionsTransmission: { type: Number },
        features: [
            {
                id: { type: String, required: true },
                logo: { type: String, required: false },
                name: { type: String, required: true },
            },
        ],
        rangeFrom: { type: Number, required: true, default: 0 },
        rangeTo: { type: Number, required: true, default: 0 },
        rating: {
            avg: { type: Number, required: true, default: 0 },
            star1: { type: Number, required: true, default: 0 },
            star2: { type: Number, required: true, default: 0 },
            star3: { type: Number, required: true, default: 0 },
            star4: { type: Number, required: true, default: 0 },
            star5: { type: Number, required: true, default: 0 },
        },
        wdShort: {
            type: {
                price: { type: Number, required: true, default: 0 },
                priceOrigin: { type: Number, required: true, default: 0 },
                totalDiscountPercent: { type: Number, required: true, default: 0 },
            },
            requirer: false,
        },
        reviews: {
            type: [
                {
                    id: { type: String, required: true },
                    uid: { type: Number, require: true },
                    timeCreated: { type: Number, require: true },
                    rating: { type: Number, require: true },
                    comment: { type: String, require: false },
                },
            ],
            require: false,
        },
        desc: { type: String, required: false, default: "" },
        notes: { type: String, required: false, default: "" },
        requiredPapers: [
            {
                id: { type: String, default: "cm_gp" },
                name: { type: String, default: "CMND và GPLX (đối chiếu)" },
                logo: {
                    type: String,
                    default:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvFJREFUeNrsWtFx2kAQlTX8W5nhP6SCSBVYVGC5g6QCOxWAKgAqMB0gV2ClAnAFIf/MROkgu8we2bmRZE7H2HvnezM3COuQedp3u28PRVFAQEBAQIAYXLX9cTwe557w2x0Oh6aVMJCcwMsMxjfPgrqGUQLx/YkwkE3h5RlG4qmSMcpTIL27oshuGVk8WcH47TjJzzAKjVeGhB+ZjHd0JxofwgrcElJuquSNhP+wu/BFad0XkIJ/qSjHjGztG1kEcarpbRLzFO5x+T1x44T/ekz4xG10gfXBMyHKp5Kc9EYDiSLBRYdJeYTzSyD9QyLh2CLV9zmyB5i39YIwRpDVNZTuEms3jTWblwLpudOSJgta6HaNTalhzk+6KYgZybsxuL6Nvd2/VlpN13DBjlcaWVX31vDFb5jkCy3yfWRtlwHe2E+XlPRXdlz1zHtixxPnszS7m0POdTmiHUQ5s5X0pQm/MFnnPVK9NfkSnLS0LM1lvKB117YWH86UvmxJk+xqiu6xHsP7kplzjP49+8hSmusasobvWI+pHFeXYS+dt5YYMYgqmowNRboNaEZK0+hKrMMn0mg6NCOisnM1pK9+qzps1S1RVnWqjx7ZXkCT4X7oronUOqxI5pSNi5ZzatdzZVpXxdVhbA1hPFOWLjqmJeSjtzB3Qe2ke5Im6W40b9xQDX6h9zda5kYDkmNWl1KPR+dGllq+CSOKZWfZMReJzlRfTIrIXIrwQmv6p13rjSI5B+JV9P/nm+NmAJybi6/DtFHHt3Om5yQXyrrfaRkg7vs2AyT1w9wblyaZFOZWrKNKehKdKEnnmmU0xYop5LarpZRUh1N2MVyLNjc4fe86bGI8JpSEbPDu2z3xG/+/xoU1fPeaFA1QiydMmVbUNs2lJH0d+YvrNsKpx4RTTlglkpxclVcgTspLHB954OtzI62dsySbMGuLqD7eY0vMuH+IB9NiZumy6Ixf+RwEcsqUbfX64VIgWUcBAQEBAQFy8U+AAQD14TCsJ2H4KwAAAABJRU5ErkJggg==",
                },
            },
        ],
        startTime: { type: Number, required: false, default: 0 },
        endTime: { type: Number, required: false, default: 0 },
        timeApprovedSD: { type: Number, required: false, default: 0 },
        timeApprovedWD: { type: Number, required: false, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("car", CarSchema);
