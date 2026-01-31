
//server instantiation
const express=require('express')
const app=express();


//listening (activate the server on port 3000)
app.listen(3000,()=>{
    console.log("server is running at port no. 3000");
    
});

//body parser parse karta hai request.body ko in express->post ,put
const bodyParser=require("body-parser");
//const { default: mongoose } = require('mongoose');
// specifically parse json data & add it to request.body object
app.use(bodyParser.json())

//Routes
//1.get http request 
app.get("/",(request,response)=>{
    response.send("hellow jee kaise ho sare ");
})

//2.post http request
app.post("/api/cars",(request,response)=>{
    const{name,brand}=request.body;
    console.log(name);
    console.log(brand);
    response.send("car submitted succesfully.");
})


//connecting express with database using mongoose
const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase").then(()=>{
    console.log("connection successfull.")
}).catch( (error)=>{ 
    console.log(error)
})