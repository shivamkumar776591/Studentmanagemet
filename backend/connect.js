const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data")
.then(()=>{
    console.log("connected to dataase")
})
.catch((err)=>{
    console.log("err")
})

