const cloudinary = require("cloudinary").v2;
require("dotenv").config();
exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      //cloud name
      cloud_name: process.env.CLOUD_NAME,
      //api key
      api_key: process.env.API_KEY,
      //api secret
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};
