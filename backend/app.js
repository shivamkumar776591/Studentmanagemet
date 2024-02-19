const { urlencoded } = require("express");
const mongoose =require("mongoose")
const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const flash = require("connect-flash")
const session = require("express-session")
const RegisterfacultyStudent = require("./facultystudentdata")
const Registersubject =require("./subjectschma")
const Registersubject1 =require("./subjectschema1")
const Registersubject2 =require("./subjectschema2") 
const Registersubject3 =require("./subjectschema3") 
const ContactData = require("./contactschema");
require("./connect");

const Register = require("./studentschema");
const Registerfaculty = require("./facultyschema");
const { Script } = require("vm");
const { maxHeaderSize, request } = require("http");
const { strict } = require("assert");
let templatePath  = path.join(__dirname,"../frontend");
let staticPath = path.join(__dirname,"../frontend/images");
let partialPath = path.join(__dirname,"../frontend/partials");
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine",'hbs');
app.set("views",templatePath);
hbs.registerPartials(partialPath);
app.use(
    express.urlencoded({
      extended: true
    })
)
// app.use(session,{
// secret:"weblesson",
// cookie:{maxAge:60000},
// saveUninitialized:false,
// resave:false
// })
app.use(session({
    secret:"weblesson",
cookie:{maxAge:60000},
saveUninitialized:false,
resave:false
}))
// app.use((flash));
app.use(flash())
app.get("/home",(req,res)=>{
    res.redirect("/");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get('/',(req,res)=>{
    
    res.render("index");
})
app.get("/back",(req,res)=>{
    res.redirect("/")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})
app.post("/contact/submit",async (req,res)=>{
    
    const conatct = new ContactData({
        username:req.body.name,
        
        email:req.body.email,
        phone:req.body.number,
        comment:req.body.FB
    }) 
    const contactsend = await conatct.save();
    console.log(contactsend);
    req.flash("message","message sent");
    res.redirect("/contact")
})

app.get("/fdetail",async (req,res)=>{
   var i =0;
   Registerfaculty.find({},function(err,foundItems){
    if(foundItems.length === 0){
        res.redirect('/');
    }
    else{
        res.render("facultydetail",{
            newListItems : foundItems
        })
    }
   })
    
    // console.log(allfacultydata)
})
app.get("/sdetail",async (req,res)=>{
    Register.find({},function(err,foundItems){
        if(foundItems.length === 0){
            res.redirect('/')
        }
        else{
            res.render("studentdetail",{
                newListItems : foundItems
            })
        }
    })
})

app.post("/faculty/login",(req,res)=>{
    res.render("facultylogin")
})
app.post("/admin/login",(req,res)=>{
    res.render("adminlogin")
})
app.post("/register/faculty-student",(req,res)=>{
    res.render("studentregister")
})
app.post("/admin",(req,res)=>{
    const adminEmail = "shivam@gmail.com";
    const adminPassword = "123456";
    let email = req.body.email;
    let password = req.body.password;
    if(adminEmail == email && adminPassword == password){
        res.render("admin")
    }
    else{
        res.send("invalid login details");
    }
})
app.get("/dashboard",(req,res)=>{
    res.render("admin")
})
app.post("/register/student",async (req,res)=>{
    const studentregister = new Register({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        enrollment:req.body.enroll,
        fathername:req.body.fname,
        Branch:req.body.branch,
        batch:req.body.batch,
        gender:req.body.gender,
        sem :req.body.sem
    }) 
    var firstname=req.body.firstname
    var lastname=req.body.lastname
    var email = req.body.email
    var sem = req.body.sem
    var branch = req.body.branch
    var enrollment=req.body.enroll
    var fname= req.body.fname
    const studentregistered = await studentregister.save();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shivamkumar776591@gmail.com',
          pass: 'bdbovfvmeqyyuzuz'
        }
      });
      
      var mailOptions = {
        from: 'shivamkumar776591@gmail.com',
        to: req.body.email,
        subject: 'Registerd as Student',
        text: `Hey  ${firstname} ${lastname}, Congratulataion you are successfully registered as Student. Your Detail are as follows
                FirstName:${firstname}
                Lastname:${lastname}
                Sem:${sem}
                Email:${email}
                Branch:${branch}
                Enrollment:${enrollment}
                Father's Name:${fname}
                    `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    console.log(studentregistered);
    res.render("studentregister");
    // module.exports = studentregister;
})

app.post("/register/faculty",async (req,res)=>{
    const facultyregister = new Registerfaculty({
        username:req.body.username,
        
        email:req.body.email,
        phone:req.body.phone,
        branch:req.body.ebranch,
        ecourse:req.body.ecourse,
        tcourse1:req.body.cname1,
        tcourse2:req.body.cname2,
     
        facultyid:req.body.fid
    }) 
    // let email = req.body.email;
    const facultyregistered = await facultyregister.save();
    console.log(facultyregistered);
    // const findfaculty = await Registerfaculty.findOne({email:email});
    // console.log(findfaculty)
  
    res.render("studentregister") 
    
    
})
app.post('/delete/:id',async (req,res)=>{
    
// const deldata = Register.findById({_id:})
    const del_id = req.params.id;

const deldata =  Register.findByIdAndRemove(del_id,(err)=>{
 if(!err){
    console.log("delected successfully");
    res.redirect("/sdetail")
 }
})
    
    
    
})
app.get("/edit/students/details/:id",async (req,res)=>{
    const upd_id = req.params.id;
    // console.log(del_id);
    // const upd_id = req.params.id;
             
    const findstudent = await Register.findOne({_id:upd_id})
    console.log(findstudent)
    res.render("editstudentdetail",{
        firstname:findstudent.firstname,
        lastname:findstudent.lastname,
        sem:findstudent.sem,
        enrollment:findstudent.enrollment,
        Branch:findstudent.Branch,
        fathername:findstudent.fathername,
        batch:findstudent.batch,
        id:findstudent._id
    });
});
app.post("/edit/students/details/:id", async (req, res) => {
    try {
    const upd_id = req.params.id;
    // console.log(req.body);
        Register.findByIdAndUpdate(upd_id,req.body,(err,docs)=>{
            if(err){
                console.log(err);
            }
            else{
                Register.find({},function(err,foundItems){
                    if(foundItems.length === 0){
                        res.redirect('/');
                    }
                    else{
                        res.render("studentdetail",{
                            newListItems : foundItems
                        })
                    }
                })
            }
        })
    } catch (err) {
        res.status(400).send(err);
    }
});
// app.get("/subject",(req,res)=>{
    
//     res.render("subject");
// })
app.post("/find/faculty",async (req,res)=>{
    const student =[]= Register.find({})
    const s_input = req.body.fsearch;
    console.log(s_input)
    const findfaculty = await Registerfaculty.findOne({facultyid:s_input});
   
//    console.log(findfaculty)
   res.redirect("/")
})

          

            
              app.get("/subjectdetail/:id",async (req,res)=>{
                const s_id =  req.params.id;
                console.log(s_id)
                const deldata = await Register.findOne({_id:s_id});
                console.log(deldata);
                if((deldata.sem == 1 && deldata.Branch == "cse") || (deldata.sem == 3 && deldata.Branch == "cse")||(deldata.sem == 5 && deldata.Branch == "cse")||(deldata.sem == 7  && deldata.Branch == "cse")||(deldata.sem == 1 && deldata.Branch == "ece")||(deldata.sem == 3 && deldata.Branch == "ece")||(deldata.sem == 5 && deldata.Branch == "ece")||(deldata.sem == 7 && deldata.Branch == "ece"))
                {

                Registersubject.find({},function(err,foundItems){
                    if(foundItems.length === 0){
                        res.redirect('/')
                    }
                    else{
                        res.render("subjectdetaill",{
                            newListItems : foundItems
                        })
                    }
                })
            }
            else{
                console.log("not found");
            }
            })
            
            app.post("/facult/login", async (req,res)=>{
                const email = req.body.useremail;
                const id = req.body.passw;
                const facaulty = await  Registerfaculty.findOne({email:email})
// console.log(facaulty)
                
               if(id == facaulty.facultyid){
                const display =   await RegisterfacultyStudent.find({});
                    
               const display1 = await RegisterfacultyStudent.find({facultyid:id});
            //    console.log(display1);
            //    console.log(display1)
                RegisterfacultyStudent.find({facultyid:id},function(err,foundItems){
                    if(foundItems.length === 0){
                        res.send('not found')
                    }
                    else{
                        res.render("faculty",{
                            username:facaulty.username,
                            newListItems : foundItems
                        })
                    }
                })
            }
            else{
                res.send("err");
            }
            })
            // const facultystudentregister = new RegisterfacultyStudent({
            //     firstname:"shivam",
            //     lastname:"kumar",
            //     facultyid:"3459",
            //     sem:"3",
            //     coursename:"compilerdesign",
            //     courseid:"cs301",
            //     marks:"65",
            //     Enrollment:"20010126"

            // }) 
            // // let email = req.body.email;
            // const facultystudentregistered =  facultystudentregister.save();
            // console.log(facultystudentregistered);
            // const findfaculty =  Registerfaculty.findOne({email:email});
            // console.log(findfaculty)
          
            // app.get("/edit/students/marks/:id",async (req,res)=>{
            //     // const id =req.params.id;
            //     // const _id = JSON.stringify(req.params.id);
            //     const edit_id=req.params.id;
            //     console.log(edit_id);
            //     const findedit =await RegisterfacultyStudent.findOne({_id:edit_id});
            //     console.log(findedit);
            //     res.render()
            //     // RegisterfacultyStudent.findOne({_id:edit_id},function(err,foundItems){
            //     //     if(foundItems.length === 0){
            //     //         res.send('not found')
            //     //     }
            //     //     else{
            //     //         res.render("faculty",{
            //     //             username:facaulty.username,
            //     //             newListItems : foundItems
            //     //         })
            //     //     }
            //     // })
            //         // const marks = req.body.studentmarks;
            //         // console.log(marks);
                
               
                
            //     // const updated = await RegisterfacultyStudent.findByIdAndUpdate(edit_id, {marks:marks});
            //     // console.log(updated);
                   
            //     // console.log(x);
            //     // console.log(req.body)
            //     // let id = req.body.editmarks
            //     // console.log(id);
                
                
            // }) 
            app.get("/logout",(req,res)=>{
                res.redirect("/");
            })
            app.get("/edit/students/marks/:id",async (req,res)=>{
                const upd_id = req.params.id;
             
                const findstudent = await RegisterfacultyStudent.findOne({_id:upd_id})
                console.log(findstudent)
                res.render("editmarks",{
                    firstname:findstudent.firstname,
                    lastname:findstudent.lastname,
                    sem:findstudent.sem,
                    Enrollment:findstudent.Enrollment,
                    coursename:findstudent.coursename,
                    courseid:findstudent.courseid,
                    marks:findstudent.marks,
                    _id:findstudent._id
                });
                // const update = RegisterfacultyStudent.findOneAndUpdate(upd_id,req.body,{new:true},(err,docs)=>{
                //     if(err){
                //         console.log("cannot update the data");
                //     }
                //     else{
                //         res.render("editmarks",{
                //             firstname:findstudent.firstname,
                //             lastname:findstudent.lastname,
                //             sem:findstudent.sem,
                //             Enrollment:findstudent.Enrollment,
                //             coursename:findstudent.coursename,
                //             courseid:findstudent.courseid,
                //             marks:findstudent.marks,
                //             _id:findstudent._id
                //         });
                //     }
                // })
            });
            app.post("/edit/students/marks/:id", async (req, res) => {
                try {
                const upd_id = req.params.id;
                const studentfind = await RegisterfacultyStudent.findOne({_id:upd_id});
// console.log(studentfind)
                const id = studentfind.facultyid;

//                 console.log(id);
                const faculty = await Registerfaculty.findOne({facultyid:id})
console.log(faculty);
//                 console.log(upd_id);
                // console.log(req.body);
                // const facaulty = await  Registerfaculty.findOne({facultyid:id})
                    RegisterfacultyStudent.findByIdAndUpdate(upd_id,req.body,(err,foundItems)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            RegisterfacultyStudent.find({facultyid:id},function(err,foundItems){
                                if(foundItems.length === 0){
                                    res.send('not found')
                                }
                                else{
                                    res.render("faculty",{
                                        username:faculty.username,
                                        newListItems : foundItems
                                    })
                                }
                      
                            })
                        }
                });
                
                    
                    
                    // RegisterfacultyStudent.find({facultyid:id},function(err,foundItems){
                    //     if(foundItems.length === 0){
                    //         res.send('not found')
                    //     }
                    //     else{
                    //         res.render("faculty",{
                    //             username:facaulty.username,
                    //             newListItems : foundItems
                    //         })
                    //     }    
                    // });
                } catch (err) {
                    res.status(400).send(err);
                }
            });
            // app.get("/updatestaff/:id",(req,res)=>{
            //     const upd_id = req.params.id;
            //     // console.log(del_id);
            //     const upddata = RegisterfacultyStudent.findOneAndUpdate(upd_id,req.body,{new:true},(err,docs)=>{
            //         if(err){
            //             console.log("cannot update the data");
            //         }
            //         else{
            //             res.render("editmarks",{update:docs
            //             });
            //         }
            //     })
            // });
            // app.post("/edit/students/marks/:id", async (req, res) => {
            //     try {
            //     const upd_id = req.params.id;
            //         RegisterfacultyStudent.findByIdAndUpdate(upd_id,req.body,(err,docs)=>{
            //             if(err){
            //                 console.log(err);
            //             }
            //             else{
            //                 RegisterfacultyStudent.find({},function(err,foundItems){
            //                     if(foundItems.length === 0){
            //                         res.redirect('/');
            //                     }
            //                     else{
            //                         res.render("faculty",{
            //                             newListItems : foundItems
            //                         })
            //                     }
            //                 })
            //             }
            //         })
            //     } catch (err) {
            //         res.status(400).send(err);
            //     }
            // });
            
            app.get('*', function(req, res){
                res.status(404).render('error');
              });
app.listen(3000,"127.0.0.1",()=>{
    console.log("runnig on 3000");
})