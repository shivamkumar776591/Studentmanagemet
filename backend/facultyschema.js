const mongoose = require("mongoose");
const validator = require("validator")
const FacultytData = mongoose.Schema({
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
   
    tcourse1:{
        type:String,
        required:true
            },
            tcourse2:{
                type:String,
                required:true
                    },
            
    ecourse:{
        type:String,
        required:true
            },

    facultyid:{
        type:String,
        required:true
    }

})

const Registerfaculty = new mongoose.model("OurFacultyData",FacultytData);
module.exports = Registerfaculty;