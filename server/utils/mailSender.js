const nodemailer = require('nodemailer');
const mailSender=async (email,title,body)=>{  //async function to send mail to the user     otp ko mail me send karne ke liye
    try{
let transporter=nodemailer.createTransport({      //create a transporter        
    host:process.env.EMAIL_HOST,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }

})
let info=await transporter.sendMail({
    from:'StudyNotion || CodeHelp-by raj',
    to:email,
    subject:title,
    html:body
});
console.log(info);
return info;

}catch(error){
console.log(error.message);

    }
}
module.exports=mailSender;