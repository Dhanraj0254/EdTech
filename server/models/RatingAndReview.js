const mongoose = require('mongoose');

const ratingAndReviewSchema=new mongoose.Schema({
 user:{
    type:mongoose.Schema.Types.ObjectId,                    //Refers to the user Schema
    required:true,                                     //Required
    ref:"User"                                      //Refers to the User Schema

 },
 rating:{
        type:Number,
        required:true,                                     //Required
 },
    review:{
        type:String,
        required:true,                                     //Required
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true,
    }
});
module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);               //Exports the RatingAndReview Schema