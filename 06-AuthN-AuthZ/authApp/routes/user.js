const express = require("express");
const router = express.Router();

//import controller (handler)
const { login, signup } = require("../controllers/auth");

//mapping
//router.post("/login", login);
router.post("/signup", signup);
//export
module.exports = router;
