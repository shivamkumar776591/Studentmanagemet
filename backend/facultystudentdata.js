const mongoose = require("mongoose");
const validator = require("validator")
const FacultytStudentData = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
   
    
  lastname:{
    type:String,
    required:true
  },
   

    facultyid:{
        type:String,
        required:true
    },
    sem:{
        type:String,
        required:true
    },
    coursename:{
        type:String,
        required:true
    },
courseid:{
    type:String,
    required:true
},
marks:{
    type:String,
    required:true
},
Enrollment:{
    type:String,
    required:true
}

})

const RegisterfacultyStudent = new mongoose.model("FacultyyData",FacultytStudentData);
module.exports = RegisterfacultyStudent;