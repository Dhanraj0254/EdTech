const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require('crypto');


//capture the payment and initiate the RazorPay order
exports.capturePayment=async(req,res)=>{
    //get courseId and UserId
    const {course_id}=req.body;
    const userId=req.user.id;
    //validation
    //valid courseId
    if(!course_id){
        return res.json({
            success:false,
            message:"please provide valid details"
        })
    }
    //valid  course details
       let course;
       try{
           course= await Course.findById(course_id);
           if(!course){
            return res.json({
        success: false,
        message:"Could not find the cousre",
            });
           }
           // user already pay for tyhe same course
           const uid=new mongoose.Types.ObjectId(userId);    // user id string type to convert object type
           if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:'Student is already enrolled'
            });
           }
       }
       catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:error.message,
   });

   
       }
    //order create 
    const amount=course.price
    const currency="INR";

    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };
    try{
  const paymentResponse=await instance.orders.create(options);
  console.log(paymentResponse);
   //return response
   return res.status(200).json({
    success:true,
    courseName:course.courseName,
    courseDescription:course.courseDescription,
    thumbnail:course.thumbnail,
    orderId:paymentResponse.id,
    currency:paymentResponse.currency,
    amount:paymentResponse.amount,
   });
  
    }
    catch(error){
      console.log(error);
      res.json({
        success:false,
        message:"Could not initiate order"
      });
      
    }
    //return response

}
// verify Signature of RazorPay and server
//HW: Checksum
exports.verifySignature=async (req,res)=>{
    const webhookSecret = '1234567';  // this self create
    const signature=req.headers["x-razorpay-signature"]  //razorpay se a rha this self razorpay key

      const shaSum=crypto.createHmac("sha256",webhookSecret);
 shaSum.update(JSON.stringify(req.body));
const digest=shaSum.digest("hex");
//match digest and signature
if(signature===digest){
    console.log("Payment is Authorized");
    
    const {courseId,userId}=req.body.payload.payment.entity.notes;
    try{
   /// fullfill the action

   //find the course and enroll the  students in it
   const enrolledCourse=await Course.findOneAndUpdate(
                                               {_id:courseId},
                                               {$push:{studentsEnrolled:userId}},
                                               {new:true},
         );
         if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"Course not found",
            })
         }
         console.log(enrolledCourse);

         //find  the student added the course  to their list enrolled courses me
         const enrolledStudent=await User.findOneAndUpdate(
                                                     {_id:userId},
                                                     {$push:{ courses:courseId}},
                                                     {new:true},
         );
         console.log(enrolledStudent);

         //mail dend kar do confirmation vala
         const emailResponse=await mailSender(
                                       enrolledStudent.email,
                                       "Congratulation from codehelp",
                                       "Congratulation, you are onboarded into new Codehelp Course",
         );
         console.log(emailResponse);
         //return response
         return res.status(200).json({
            success:true,
            message:"Signature verified and Course  Added"
         })
         
    }
    catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:error.message,
   });
    }
}else{
    return res.status(400).json({
        success:false,
        message:"Invalid request",
    })
}

   
}
