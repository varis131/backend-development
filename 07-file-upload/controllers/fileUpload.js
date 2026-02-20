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
async function uploadFileToCloudinary(file, folder, quality) {
  const options = {
    folder: folder,
    resource_type: "auto", // ✅ correct spelling
  };
    if (quality) {
    options.transformation = [
      { quality: quality }
    ];
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
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

    console.log("filetype:", fileType);

    //file format not supported
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported.",
      });
    }

    //file format supported
    const response = await uploadFileToCloudinary(file, "cloudinaryFiles");
    console.log(response);

    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully uploaded.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong.",
    });
  }
};

//video upload ka handler
exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("filetype:", fileType);

    //file format not supported
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format enot supported.",
      });
    }

    //file format supported
    const response = await uploadFileToCloudinary(file, "cloudinaryFiles");
    console.log(response);

    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully uploaded.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong.",
    });
  }
};

//imageReducerUpload handler
exports.imageReducerUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpeg", "png", "jpg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("filetype:", fileType);

    //file format not supported
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported.",
      });
    }

    //file format supported
    const response = await uploadFileToCloudinary(file, "cloudinaryFiles", 30);
    console.log(response);

    //db me entry save karni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });

    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "image successfully uploaded.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong.",
    });
  }
};
