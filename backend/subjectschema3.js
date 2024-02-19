const mongoose = require("mongoose");

const SubjectData3 = mongoose.Schema({
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

const Registersubject3 = new mongoose.model("StudentSubjectData3",SubjectData3);
module.exports = Registersubject3;