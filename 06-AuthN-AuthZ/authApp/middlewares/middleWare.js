const jwt = require("jsonwebtoken");
require("dotenv").config();

// ======================
// 1️⃣ AUTH MIDDLEWARE
// ======================
exports.auth = (req, res, next) => {
  try {
    let token;

    // 🔹 1. From Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 🔹 2. From Cookies
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 🔹 3. From Body (Testing purpose)
    else if (req.body?.token) {
      token = req.body.token;
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // ✅ Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to request
    req.user = payload;

    next();
  } catch (error) {
    console.log("VERIFY ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// ======================
// 2️⃣ STUDENT MIDDLEWARE
// ======================
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({
        success: false,
        message: "This route is protected for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// ======================
// 3️⃣ ADMIN MIDDLEWARE
// ======================
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This route is protected for Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
