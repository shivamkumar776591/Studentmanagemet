const mongoose = require("mongoose");
const validator = require("validator")
const ContactData = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
   
    
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                res.send("invalid email");
            }
        }
    },
    phone:{
        type:Number,
        required:true
    },
   
    comment:{
        type:String,
        required:true
            }
            
            
    

  

})

const Sendmessage = new mongoose.model("OurContactData",ContactData);
module.exports = Sendmessage;