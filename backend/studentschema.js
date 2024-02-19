const mongoose = require("mongoose");
const validator = require("validator")
const StudentData = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
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
    enrollment:{
        type:Number,
        required:true,
        unique:true
    },
    fathername:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    batch:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        
    },
    sem:{
        type:Number
    }
})

const Register = new mongoose.model("OurStudentData",StudentData);
module.exports = Register;