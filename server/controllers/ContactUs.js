const {contactUsEmail}=require("../mail/templates/contactFormUs");
const mailSender=require("../utils/mailSender");
exports.contactUsController=async(req,res)=>{
    
   //fetch data
   const{email,firstname,lastname,message,countrycode,phoneNo}=req.body;
   console.log(req.body);
   try{
       const emailRes= await maillSender(
        email,
        "Your Data send Successfully",
       contactUsEmail(email,firstname,lastname,message,phoneNo,countrycode)
       )
       console.log('emailRes',emailRes);
       //return response
       return res.status(200).json({
        success:true,
        message:"Email send successfully"
       })
       
    }
    catch(error){
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
          success: false,
          message: "Something went wrong...",
        })
    }
}