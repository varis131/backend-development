//app create
const express = require("express");
const app = express();

//port find out
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
//filr upload middleware
// middleware
app.use(fileUpload());

//db connect
const db = require("./config/database");
db.connect();

//cloudinary connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//fetch routes and mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT, () => {
  console.log(`app is runnig at port ${PORT}`);
});
