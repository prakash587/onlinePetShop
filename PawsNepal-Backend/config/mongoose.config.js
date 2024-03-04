let mongoose = require("mongoose");
const {DB_URL,DB_NAME}  = process.env;
let url = DB_URL + "/" +DB_NAME;

mongoose.connect(url).then(()=>{
    console.log("DB connected Successfully");
}).catch((error)=>{
    console.log("db connection failed",error);
})