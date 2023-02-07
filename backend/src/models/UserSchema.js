const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcrypt");
const Crypto = require("crypto");
const lodash = require("lodash");
const JWT = require("jsonwebtoken");
const { SECRET, SECRET_REFRESH } = require("../constant/_IndexConstant");
mongoose.set("strictQuery", false);

const UserSchema = new Schema(
    {
        FirstName: { type: String, required: true },
        LastName: { type: String, required: true },
        SDT: { type: String, require: true },
        Address: { type: String },
        Email: { type: String, required: true },
        Password: { type: String, required: true },
        Avatar: { type: String, require: true },
        Role: { type: String, require: true, default: "USER" },
        Verified: { type: Boolean, default: false },
        VerifyCode: { type: String, required: true, default: "555555" },
        VerifyCodeExpired: { type: Date, require: true, default: Date.now() + 1000 * 60 * 15 },
        AccessToken: { type: String, required: true },
        RefreshToken: { type: String, require: true },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("Password")) return next();
        const salt = await Bcrypt.genSalt(10);
        const hashedPassword = await Bcrypt.hash(this.Password, salt);
        this.Password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return await Bcrypt.compare(password, this.Password);
};

UserSchema.methods.generateJWT = async function () {
    let payload = {
        FirstName: this.FirstName,
        LastName: this.LastName,
        Email: this.Email,
        Role: this.Role,
    };

    this.AccessToken = JWT.sign(payload, SECRET, { expiresIn: 1000 * 60 * 15 });
};

UserSchema.methods.generateRefreshJWT = async function () {
    let payload = {
        FirstName: this.FirstName,
        LastName: this.LastName,
        Email: this.Email,
        Role: this.Role,
    };

    this.RefreshToken = JWT.sign(payload, SECRET_REFRESH, { expiresIn: "15 day" });
};

UserSchema.methods.generateVerifyCode = async function () {
    this.VerifyCode = Math.floor(100000 + Math.random() * 900000);
    this.VerifyCodeExpired = Date.now() + 1000 * 60 * 15;
};

UserSchema.methods.refreshVerifyCode = async function () {
    this.VerifyCode = Math.floor(100000 + Math.random() * 900000);
    this.VerifyCodeExpired = Date.now() + 1000 * 60 * 15;
};

UserSchema.methods.getUserInfo = function () {
    return lodash.pick(this, ["_id", "FirstName", "LastName", "Email", "SDT", "Address", "Role"]);
};

UserSchema.methods.getToken = function () {
    return lodash.pick(this, ["AccessToken", "RefreshToken"]);
};

module.exports = mongoose.model("user", UserSchema);
