const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);


const FeatureSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            // require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("feature", FeatureSchema);