const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);


const RequireSchema = new Schema(
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
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("require", RequireSchema);
