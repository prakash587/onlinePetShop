const express = require("express")
const app = express();
const {PORT,HOST_NAME} = require("./config/constant");
const routes = require("./routers/index");
require("./config/mongoose.config.js");
const cors = require("cors");


app.use("/uploads",express.static(process.cwd()+"/uploads"));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use("/",routes);

app.use((req,res,next)=>{
    next({
        status:404,
        result:null,
        message:"not found"
    })
})
app.use((error,req,res,next)=>{
    let status = error.status || 500;
    let message = error.message || JSON.stringify(error);
    console.log(error);
    res.status(status).json({
        result:null,
        message:message,
        status:false
    })
});

app.listen(PORT,HOST_NAME,(err)=>{
    if(err){
        console.log(`Error in port ${PORT,HOST_NAME}`)
    }else{
        console.log(`Server is running in ${PORT,HOST_NAME}`);
        console.log("Press CTRL +C to close the Server")
    }
})