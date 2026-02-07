//server instantiate
const express = require("express");
const app = express();

//process object ke andar .env ki configurations load ho jati hai
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());

//import routes
const user = require("./routes/user");
//mount route
app.use("/api/v1", user);

//connect db
require("./config/database").connect();

//start server
app.listen(PORT, () => {
  console.log(`server is started at port ${PORT}`);
});

//default route
