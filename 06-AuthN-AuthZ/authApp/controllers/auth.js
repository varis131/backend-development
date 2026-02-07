const bcrypt = require("bcrypt");

const User = require("../models/userModel");

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
      message: "user created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cant be registered, please try again later.",
    });
  }
};
