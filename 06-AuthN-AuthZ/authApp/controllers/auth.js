const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

//signup route handler
exports.signup = async (req, res) => {
  try {
    //fetch data from req body
    const { name, email, password, role } = req.body;

    //now check ki user already exist to nahi karta
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already existed",
      });
    }

    // now secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    //create entry for user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "user created successfully!!.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cant be registered, please try again later.",
    });
  }
};

//login handler
exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    //now check validity
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill the data carefully!!",
      });
    }

    //check for registered user
    let user = await User.findOne({ email });
    //if not a registered use (to pahle register karo)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered!!",
      });
    }

    //create a payload
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    //verify password and generate a jwt token
    if (await bcrypt.compare(password, user.password)) {
      //password match
      //1.create a jwt token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user=user.toObject();
      user.token = token;
      user.password = undefined;

      //cerate a cookie
      const options = {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully.",
      });
    } else {
      //password not match
      return res.status(403).json({
        success: false,
        message: "incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failed",
    });
  }
};
