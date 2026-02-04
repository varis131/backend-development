//server instantiate
const express = require("express");
const app = express();

//port nikalo from env
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//parsing(middleware)
app.use(express.json());

//import routes
const blog = require("./routes/blog");
//mount
app.use("/api/v1", blog);

//connect database
const connectWithDb = require("./config/database");
connectWithDb();

//start the server
app.listen(PORT, () => {
  console.log(`server started at port no. ${PORT}`);
});

// app.listen(4000,()=>{
//   console.log("server started");
  
// })
//default route 
app.get("/", (req,res)=>{
   res.send(`<h1>This is homepage baby..</h1>`)
})
