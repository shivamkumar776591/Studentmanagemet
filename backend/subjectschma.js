const mongoose = require("mongoose");

const SubjectData = mongoose.Schema({
    subject1:{
        type:String,
        required:true
    },
    id1:{
        type:String,
        required:true
    },
    subject2:{
        type:String,
        required:true
    },
    id2:{
        type:String,
        required:true
    },
subject3:{
        type:String,
        required:true,
        
    },
    id3:{
        type:String,
        required:true
    },
subject4:{
        type:String,
        required:true
    },
    id4:{
        type:String,
        required:true
    },
    subject5:{
        type:String,
        required:true,
        
    },
    id5:{
        type:String,
        required:true
    }
    
    
})

const Registersubject = new mongoose.model("StudentSubjectData",SubjectData);
module.exports = Registersubject;