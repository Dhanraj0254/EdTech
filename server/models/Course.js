const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
  
    courseName:{
        type:String,
        required:true,
        trim:true,              //Required 
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true,              //Required 
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,                    //Refers to the instructor Schema
        required:true,                                     //Required   
        ref:"User"                                      //Refers to the User Schema,

    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim:true,              //Required 
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,                    //Refers to the courseContent Schema
        required:true,                                     //Required   
        ref:"Section"                                      //Refers to the Section Schema
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,                    //Refers to the ratingAndReviews Schema
        required:true,                                     //Required   
        ref:"RatingAndReview"                                      //Refers to the RatingAndReview Schema
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
        required:true,              //Required 
    },
    tag:{
type:[String],                    //Refers to the tag Schema
required: true,                                      //Refers to the Tag Schema
    },
    category:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Category",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,                    //Refers to the studentsEnrolled Schema
        ref:"User"                                      //Refers to the User Schema
    }],
    instruction:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
    
});
module.exports=mongoose.model("Course",courseSchema);               //Exports the Course Schema