const express = require("express");
const cors = require("cors");
const { PORT } = require("./constant/_IndexConstant");
const DB = require("./configs/db/connectDB");
const Route = require("./routes/_IndexRoute");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));
Route(app);

const main = async () => {
    try {
        await DB.connectDB();
        app.listen(parseInt(PORT), () => {
            console.log(`Example app listening at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(`Unable to start the server: \n${err.message}`);
    }
};

main();
