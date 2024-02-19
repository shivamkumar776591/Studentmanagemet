const mongoose = require("mongoose");

const SubjectData2 = mongoose.Schema({
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

const Registersubject2 = new mongoose.model("StudentSubjectData2",SubjectData2);
module.exports = Registersubject2;