//auth,isStudent,isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

//1.auth middleware
exports.auth = (req, res, next) => {
  try {
    //extract jwt token
    const token = req.body.token; //other ways also possible(cookies,header)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing.",
      });
    }

    //verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;//taki hum baad me roles ko compare kar paye
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid !!",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "something went wrong while vrifying token",
    });
  }
};

//2. isStudent middleware
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for students only",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user role cannot be verified ",
    });
  }
};

//3. isAdmin middleware
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for Admins only",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user role cannot be verified ",
    });
  }
};
