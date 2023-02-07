const mongoose = require("mongoose");
const { URL_DB } = require("../../constant/_IndexConstant");

connectDB = async () => {
  try {
    await mongoose.connect(URL_DB).then(() => {
      console.log("Successful connection DB");
    });
  } catch (error) {
    console.log("Failure connection DB");
  }
};

module.exports = { connectDB };
