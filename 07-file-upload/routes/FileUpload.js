const express = require("express");
const router = express.Router();

//import controller (handler)
const {
  imageUpload,
  videoUpload,
  imageReducerUpload,
  localFileUpload,
} = require("../controllers/fileUpload");

//define rotes
router.post("/loaclFileUpload",localFileUpload);

//export router
module.exports=router;
