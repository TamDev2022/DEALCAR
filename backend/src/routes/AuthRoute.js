const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers/_IndexController");
const { AuthJWTMiddleware } = require("../middlewares/_IndexMiddleware");

router.post("/token", AuthController.PostLogin);
router.post("/refresh-token", AuthJWTMiddleware.VerifyRefreshToken, AuthController.RefreshToken);
router.get("/verify-token", AuthJWTMiddleware.VerifyAccessToken, AuthController.VerifyToken);
router.post("/register", AuthController.PostRegister);
router.get("/user-info", AuthJWTMiddleware.VerifyAccessToken, AuthController.GetUser);
router.post("/confirm-register", AuthController.ConfirmRegister);
router.post("/resend-verifycode", AuthController.ResendVerifyCode);

module.exports = router;
