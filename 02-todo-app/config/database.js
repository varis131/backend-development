const mongoose=require("mongoose")

require("dotenv").config();

const dbConnect= () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then( () => console.log("database connection successful."))
    .catch( (error) => {
        console.log("issue in db connection")
        console.error(error.message);
        process.exit(1);
    } )
}

module.exports=dbConnect;
