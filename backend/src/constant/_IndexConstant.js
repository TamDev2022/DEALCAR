const dotenv = require("dotenv");
dotenv.config();

const URL_ATLAS_DB = process.env.URL_ATLAS_DB;
const URL_DB = process.env.URL_DB;
const SECRET = process.env.APP_SECRET;
const SECRET_REFRESH = process.env.APP_SECRET_REFRESH;
const PORT = process.env.PORT || process.env.APP_PORT;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const { AvatarDefault } = require("./AvatarDefault");

module.exports = {
    URL_ATLAS_DB,
    URL_DB,
    SECRET,
    SECRET_REFRESH,
    PORT,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    AvatarDefault,
};
