const mongoose = require('mongoose');
//const { resetPasswordToken } = require('../controllers/ResetPassword');
const userSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:true,
    trim:true
},
lastName:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    
},
accountType:{
    type:String,
    enum:["Admin","Student","Instructor"],
    required:true,
},
active:{
    type:Boolean,
    default:true,
},
approved:{
     type:Boolean,
     default:true,
},
additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,                    //Refers to the additionalDetails Schema
    required:true,                                     //Required   
    ref:"Profile"                                      //Refers to the Profile Schema
},
courses:[{
    type:mongoose.Schema.Types.ObjectId,                    //Refers to the courses Schema
                                                         //Required   
    ref:"Course",                                    //Refers to the Course Schema
}
],
image:{
    type:String,
    required:true,                              //Required          

},
courseProgress:[{
    type:mongoose.Schema.Types.ObjectId,                    //Refers to the courseProgress Schema
                                                         //Required   
    ref:"CourseProgress"                                    //Refers to the CourseProgress Schema
}
],
token:{                  //Token
    type:String,
    required:true,
},
resetPasswordExpires:{                               //Reset Password Token
    type:Date,
   
},

},
{ timestamps: true }
)
module.exports=mongoose.model("User",userSchema);               //Exports the User Schema