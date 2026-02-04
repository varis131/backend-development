const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("databse connection successful."))
    .catch((error) => {
      console.log("issue in database connection");
      console.log(error);
      console.error(error.message);
      process.exit(1);
    });
};

module.exports=connectWithDb
