const jwt = require("jsonwebtoken"); //importing the jsonwebtoken library
    require('dotenv').config(); //importing the dotenv library
    const User=require('../models/User'); //importing the User model
    const OTP=require('../models/OTP');   //importing the OTP model
//auth
  exports.auth=async(req,res,next)=>{
    try{
        //extract the token from the header
        const token=req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer ", "");
        //if token not present then return error message
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not present",
            });
        }
        //varify the token 
        try{
          const decode= await jwt.verify(token,process.env.JWT_SECRET); //verifying the token
            console.log("Decode:",decode);
            req.user=decode; //setting the user in the request object

        }
        catch(err){
                //verificaion issue
                return res.status(401).json({
                    success:false,
                    message:"Invalid token",
                });
        }
        next(); //move to the next middleware
    }
    catch(error){
         return res.status(401).json({
             success:false,
             message:"Something went wrong while validating the token",
         });
    }
  }
// isStudent
exports.isStudent=async(req,res,next)=>{       
    try{ 
        const userDetails = await User.findOne({ email: req.user.email });
    if(userDetails.accountType!=="Student"){ //checking the account type of the user
        return res.status(401).json({
            success:false,
            message:"This is protected route for Students only",
        });
    
    }
    next(); //move to the next middleware
}
    catch(error){
   return res.status(500).json({
       success:false,
       message:"User role can not  be verified ,please try again",
    });
}
}
//isInstructor
exports.isInstructor=async(req,res,next)=>{       
    try{ 
        const userDetails = await User.findOne({ email: req.user.email });
    if(userDetails.accountType!=="Instructor"){ //checking the account type of the user
        return res.status(401).json({
            success:false,
            message:"This is protected route for Instructor only",
        });
    
    }
    next(); //move to the next middleware
}
    catch(error){
   return res.status(500).json({
       success:false,
       message:"User role can not  be verified ,please try again",
    });
}
}

//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{
        const userDetails = await User.findOne({ email: req.user.email });
        console.log(userDetails);
        
    if(userDetails.accountType!=="Admin"){ //checking the account type of the user
        return res.status(401).json({
            success:false,
            message:"This is protected route for Admin only",
        });
    }
    next(); //move to the next middleware
}
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role can not be verified ,please try again",
        });
    }
}
