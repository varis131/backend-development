const express = require("express");
const router = express.Router();

//import controller (handler)
const { login, signup } = require("../controllers/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/middleWare");

//mapping
router.post("/login", login);
router.post("/signup", signup);

//protected routes
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected routes of the tests",
    })
})

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route of student",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route of admin",
  });
});

//export
module.exports = router;
