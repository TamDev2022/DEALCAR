const JWT = require("jsonwebtoken");
const { SECRET, SECRET_REFRESH } = require("../constant/_IndexConstant");
const { TokenExpiredError } = JWT;

const CatchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized! Access Token was expired!" });
    }
    return res.status(401).json({ success: false, message: "Unauthorized!" });
};

const VerifyAccessToken = (req, res, next) => {
    try {
        let authheader = req.headers["authorization"];
        if (!authheader) {
            return res.status(403).json({ success: false, message: "No token provided!" });
        }
        JWT.verify(authheader.split(" ")[1], SECRET, (err, decoded) => {
            if (err) {
                return CatchError(err, res);
            }
            req.Email = decoded.Email;
            next();
        });
    } catch (error) {
        next(error);
    }
};

const VerifyRefreshToken = (req, res, next) => {
    try {
        let authheader = req.headers["authorization"];
        if (!authheader) {
            return res.status(403).json({ success: false, message: "No token provided!" });
        }
        JWT.verify(authheader.split(" ")[1], SECRET_REFRESH, (err, decoded) => {
            if (err) {
                return CatchError(err, res);
            }
            req.Email = decoded.Email;
            next();
        });
    } catch (error) {
        next(error);
    }
};
module.exports = { VerifyAccessToken, VerifyRefreshToken };
