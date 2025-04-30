const User = require("../models/User");
    //importing the User model

const mailSender=require('../utils/mailSender'); //importing the mailSender module
const bcrypt=require('bcrypt'); //importing the bcrypt module
const crypto=require('crypto'); //importing the crypto module
//resetpassword token
exports.resetPasswordToken= async (req,res)=>{
   try{
 //get gmail from req body
 const email=req.body.email;
 //check user this email,email validation
 console.log(email);
 
 const user = await User.findOne({ email:email });
 console.log("first");
 
 if(!user){
     return res.status(400).json({
         success:false,
         message:"Your email not registered",
     });
 }
//generate token
const token =crypto.randomBytes(20).toString("hex");
//update user by adding token  and expiration time
const updateDetails=await User.findOneAndUpdate(
    {email:email},
    {
     token:token,
      resetPasswordExpires:Date.now()+3600000,
},
{new:true}
);            //update the user udpdated value return 

//create url
const url=`https://localhost:3000/update-password/${token}`;
 //send email containing url
 await mailSender(email,
     "Password Reset Link",
     `Password Reset Link: ${url}`);
 
//return response
return res.json({
 success:true,
 message:"Password reset link sent to your email",
});

   }
   catch(error){
    console.log("Error:",error);
    
         return res.status(500).json({
              success:false,
              message:"Something went wrong while generating the reset password mail",
         });
   }
}

//resetpassword
exports.resetPassword=async(req,res)=>{
    try{
// data fetch
const {password,confirmPassword,token}=req.body;
//validation
if(password!==confirmPassword){
    return res.status(400).json({
        success:false,
        message:"Password and Confirm Password do not match",
    });
}
//get userdetails from the db using token
const userDetails=await User.findOne({token:token});
//if no entry invalid token
if(!userDetails){
    return res.status(400).json({
        success:false,
        message:"Invalid Token",
    });
}
//token time check
if(!(userDetails.resetPasswordExpires>Date.now())){    //if token expired return error
    return res.status(400).json({
        success:false,
        message:"Token expired please try again",
    });
}
//hash the password
const hashedPassword=await bcrypt.hash(password,10);
//update the password
await User.findOneAndUpdate(     //update the user by token
    {token:token},
    {password:hashedPassword},
    {new:true}        //update the user udpdated value return
)
//return response
return res.json({
    success:true,
    message:"Password updated successfully",
});
}  
    catch(error){
console.log("Error:",error);
return res.status(500).json({
    success:false,
    message:"Something went wrong while updating the password",
});

    }
}
