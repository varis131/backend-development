const File = require("../models/File");

//localFileUpload controller (handler)
exports.localFileUpload = async (req, res) => {
  try {
    //fetch file from request 
    const file = req.files.file;
    console.log("file aa gayi oyyee", file);
    
    //create path jaha file ko store kRNA HAI ON SERVER 
    let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
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
