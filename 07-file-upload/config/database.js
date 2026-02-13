const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("database connection successfull.");
    })
    .catch((error) => {
      console.log("db connection issue");
      console.error(error);
      process.exit(1);
    });
};
