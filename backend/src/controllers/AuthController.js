const JWT = require("jsonwebtoken");
const { UserSchema } = require("../models/_IndexModel");
const AsyncHandler = require("../middlewares/AsyncHandler_Middleware");
const EmailSender = require("../functions/EmailSender");
const { SECRET, AvatarDefault } = require("../constant/_IndexConstant");
const path = require("path");

class AuthorController {
    // api/auth/info
    GetUser = AsyncHandler(async (req, res) => {
        let Email = req.Email;
        let user = await UserSchema.findOne({ Email });
        if (!user) {
            return res
                .status(403)
                .json({ success: false, message: "There is no such user with this email." });
        }
        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            data: {
                user: {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    SDT: user.SDT,
                    Email: user.Email,
                    Password: user.Password,
                    Address: user.Address,
                    Avatar: user.Avatar,
                    Role: user.Role,
                },
                AccessToken: user.AccessToken,
                RefreshToken: user.RefreshToken,
            },
        });
    });

    // api/auth/token
    PostLogin = AsyncHandler(async (req, res) => {
        let { Email, Password } = req.body;
        let user = await UserSchema.findOne({ Email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "There is no such user with this email.",
            });
        }
        if (!(await user.comparePassword(Password))) {
            return res.status(403).json({ success: false, message: "Incorrect password." });
        }

        await user.generateJWT();
        user.save();
        return res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            data: {
                user: {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Email: user.Email,
                    Avatar: user.Avatar,
                    Role: user.Role,
                },
                AccessToken: user.AccessToken,
                RefreshToken: user.RefreshToken,
            },
        });
    });

    VerifyToken = AsyncHandler(async (req, res) => {
        let Email = req.Email;
        var user = await UserSchema.findOne({ Email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "There is no such user with this access token.",
            });
        }
        res.status(200).json({ success: true, message: "Token verification successful" });
    });

    // api/auth/refresh-token
    RefreshToken = AsyncHandler(async (req, res) => {
        let Email = req.Email;
        let user = await UserSchema.findOne({ Email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "There is no such user with this refresh token.",
            });
        }

        await user.generateJWT();
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Refresh token successfully.",
            data: {
                user: {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Email: user.Email,
                    Avatar: user.Avatar,
                    Role: user.Role,
                },
                AccessToken: user.AccessToken,
                RefreshToken: user.RefreshToken,
            },
        });
    });

    //  post api/auth/register
    PostRegister = AsyncHandler(async (req, res) => {
        let { Email } = req.body;
        if (req.body.Avatar == "") {
            req.body.Avatar = AvatarDefault;
        }
        let user = await UserSchema.findOne({
            Email,
        });
        if (user) {
            res.status(400).json({ success: false, message: "Email is already taken." });
        }

        let mail = "nguyenductam10062000@gmail.com";
        user = new UserSchema({
            ...req.body,
            Role: "USER",
        });

        await user.generateJWT();
        await user.generateRefreshJWT();

        await user.generateVerifyCode();

        await user.save();
        // Send mail to email request
        await EmailSender(mail, user.VerifyCode);

        res.status(200).json({
            success: true,
            message: "Sent verification code to email.",
            data: {
                user: {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Email: user.Email,
                    Avatar: user.Avatar,
                    Role: user.Role,
                },
            },
        });
    });

    //  post api/auth/confirm-register
    ConfirmRegister = AsyncHandler(async (req, res) => {
        const { Email } = req.body;
        let user = await UserSchema.findOne({
            Email,
        });
        if (!user) {
            res.status(400).json({ success: false, message: "Email is not correct." });
        } else if (user.Verified == true) {
            res.status(400).json({ success: false, message: "Activated account." });
        } else if (user.VerifyCodeExpired < Date.now()) {
            res.status(400).json({
                success: false,
                verifyCodeExpired: true,
                message: "Verify code expired.",
            });
        } else if (user.VerifyCode != req.body.VerifyCode) {
            res.status(400).json({ success: false, message: "Verify code is not correct." });
        } else {
            user.Verified = true;
            await user.save();
            res.json({ success: true, message: "Register successfully." });
        }
    });

    //  post api/auth/resend-verifycode
    ResendVerifyCode = AsyncHandler(async (req, res) => {
        const { Email } = req.body;
        let user = await UserSchema.findOne({
            Email,
        });

        if (!user) {
            res.status(400).json({ success: false, message: "Email is not correct." });
        } else if (user.Verified == true) {
            res.status(400).json({ success: false, message: "Activated account." });
        } else {
            let mail = "nguyenductam10062000@gmail.com";
            user.refreshVerifyCode();

            await EmailSender(mail, user.VerifyCode);
            await user.save();

            res.json({
                success: true,
                message: "Verify code expired.they sent verification code to email.",
            });
        }
    });
}

module.exports = new AuthorController();
