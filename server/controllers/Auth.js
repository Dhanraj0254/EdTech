const User=require('../models/User'); //importing the User model
const OTP=require('../models/OTP');   //importing the OTP model
const otpGenerator=require('otp-generator'); //importing the otp-generator library
const bcrypt=require('bcrypt'); //importing the bcrypt library
const jwt=require('jsonwebtoken'); //importing the jsonwebtoken library
require("dotenv").config(); //importing the dotenv library
const Profile = require("../models/Profile");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");
//const getJWT=require("../actions/getJWT")
//sendOtp
exports.sendOTP=async(req,res)=>{
    
    try{
        const{email}=req.body; //email from the request body
        //check if user already exists
        const checkUserPresent=await User.findOne({email}); //finding the user with the email
        // if user already exists then send the error message
        if(checkUserPresent){
            return res.status(400).json({
                success:false,
                message:"User already registered",
            });
        }
        //generate OTP
        var otp=otpGenerator.generate(6,{   //otp generated using otp-generator
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,       
        specialChars:false,
     });   
     console.log("OTP generated:",otp);

     //check  if otp unique or not
     const result=await OTP.findOne({otp:otp}); //finding the otp in the database

     while(result){   
            otp=otpGenerator.generate(6,{ //if otp is not unique then generate the otp again
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            console.log("OTP generated:",otp);
            result=await OTP.findOne({otp:otp}); //finding the otp in the database
     }
    
     const otpPayload={email,otp}; //otp payload
      // create an entry for otp
      const otpBody=await OTP.create(otpPayload); //creating the otp entry in the database  
        console.log("OTP created:",otpBody);

        //return success response
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        });

             

    }
    catch(error){
         console.log(error);
         return res.status(500).json({
             success:false,
             message:error.message,
         });
         
    }
} 
//  home work email validation  
// signup
exports.signup=async(req,res)=>{
      try{
  /// data fetch from the request body
  const{
    firstName,
    lastName, 
    email,
    password,
    confirmPassword,
    accountType,
   contactNumber,
    otp,  
  }=req.body;
  // validate kr lo
  if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){  //if any of the field is empty then send the error message
      return res.status(403).json({
          success:false,
          message:"Please fill all the details",
      });
  }
  //2 password match kr lo
  if(password!==confirmPassword){ //if password and confirm password do not match then send the error message
      return res.status(400).json({
          success:false,
          message:"Password and confirm password do not match please try again",
      });
  }
  /// check if user already exists
  const existingUser=await User.findOne({email}); //finding the user with the email
  if(existingUser){ //if user already exists then send the error message
      return res.status(400).json({
          success:false,
          message:"User already registered",
      });
  }
  //find most recent otp stored for the user
  const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1); //finding the most recent otp stored for the user
  console.log("Recent OTP:",recentOtp);
  
  ////validate otp
  if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            message:"OTP expired please try again",
        });
  } else if(otp!==recentOtp[0].otp){
      return res.status(400).json({
          success:false,
          message:"Invalid OTP please try again",
      });
  }
  //hash password
  const hashedPassword=await bcrypt.hash(password,10); //hashing the password          
  
  // Create the user
  let approved = ""
  approved === "Instructor" ? (approved = false) : (approved = true)
  
  //entry create in DB


  const profileDetails=await Profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contactNumber:null,
  })
   const user =await User.create({
    firstName,
    lastName,
    email,
    password:hashedPassword,
    accountType:accountType,
    approved:approved,
    contactNumber,
    additionalDetails:profileDetails._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    token:"c",
    resetPasswordExpires:Date.now()
   });
  //return success response
    res.status(200).json({        //return the success response
        success:true,
        message:"User  registered successfully",
        user,
      });
    }
      catch(error){
console.log(error);;
return res.status(500).json({ 
    success:false,
    message:"User can not be registered please try again",
  })

      }
}

//login

exports.login=async(req,res)=>{
    try{
 // get data from the request body
 const{email,password}=req.body;   //email and password from the request body

 //validate kr lo
 if(!email || !password){  //if email or password is empty then send the error message
     return res.status(403).json({
         success:false,
         message:"Please fill all the details",
     });
 }
 //user check exist or not
 const user=await User.findOne({email}).populate("additionalDetails"); //finding the user with the email
 if(!user){ //if user does not exist then send the error message
     return res.status(401).json({
         success:false,
         message:"User not registered",
     });
 }
 //generate JWT token, after password matching
 if(await bcrypt.compare(password,user.password)){ //if password matches then generate the jwt token
    //const payload=getJWt(user);
    const payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType,
    }
     const token=jwt.sign(payload,process.env.JWT_SECRET,{   //generating the jwt token
        expiresIn:"2h",
     }); //generating the jwt token
     user.token=token; //assigning the token to the user object
     user.password=undefined; //removing the password from the user object

           
     
 
 //create cookie and send to the client
 const options={
    expires:new Date(Date.now()+3*24*60*60*1000),
    httpOnly:true,
 }
 res.cookie("token",token,options).status(200).json({   //creating the cookie and sending it to the client)
    success:true,
    user,
    token,
    message:"Logged In successfully",
});
    
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Invalid Password",
        });
    }
}
    catch(error){
         console.log(error);
         return res.status(500).json({
             success:false,
             message:"User can not be logged in please try again",
         });
        
    }
}

//chanePassword
exports.changePassword=async(req,res)=>{
    try{
 //get data from req body
 const{oldPassword,newPassword,confirmPassword}=req.body; //oldPassword,newPassword,confirmPassword from the request body
 //get oldPassword ,new Password,confirmPassword
 //validation
 if(!oldPassword || !newPassword || !confirmPassword){ //if any of the field is empty then send the error message
     return res.status(400).json({
         success:false,
         message:"Please fill all the details",
     });
 }

 //update password in db using token
    const user =await User.findById(req.user.id); //finding the user with the id
    //compare old password
    if(await bcrypt.compare(oldPassword,user.password)){ //if old password matches then update the password
        //hash new password
        const hashedPassword=await bcrypt.hash(newPassword,10); //hashing the new password
        //update the password
        await User.findByIdAndUpdate(req.user.id,{password:hashedPassword}); //updating the password
        //return response
        return res.json({
            success:true,
            message:"Password updated successfully",
        });
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid password",
        });
    }
 //send mail -password
 
 
 
    }
    catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Password can not be changed please try again",
            });
    }
}

