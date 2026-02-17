const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload controller (handler)
exports.localFileUpload = async (req, res) => {
  try {
    //fetch file from request
    const file = req.files.file;
    console.log("file aa gayi oyyee", file);

    //create path jaha file ko store kRNA HAI ON SERVER
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path_name", path);

    //add path to the move function
    file.mv(path, (err) => {
      console.log(err);
    });

    //success ka response send kardo
    res.json({
      success: true,
      message: "local file uploaded successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};



//function to find wheather a file is supported or not
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

//function for uploading file to cloudinary
async function uploadFileToCloudinary(file, folder) {
  await cloudinary.uploader.upload(file.tempFilePath);
}


// image upload handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpeg", "png", "jpg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //file format not supported
    if (!isFileTypeSupported(type, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format enot supported.",
      });
    }

    //file format supported
    const response=await uploadFileToCloudinary(file, "cloudinaryFiles");

  } catch (error) {}
};
