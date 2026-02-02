

const express =require("express");
const app=express();

//load config from env file 
require("dotenv").config();
const PORT=process.env.PORT || 4000;

//middleware to parse json body 
app.use(express.json());

//import routes from todo api
const todoRoutes=require("./routes/todos");
//mount the todo api routes
app.use("/api/v1",todoRoutes);

//start server 
app.listen(PORT, () => {
    console.log(`server started at post ${PORT}`);
    
})

//connect to database 
const dbConnect=require("./config/database")
dbConnect();

//default route
app.get("/", (req,res) => {
res.send(`<h1>this is homepage baby.</h1>`);
})