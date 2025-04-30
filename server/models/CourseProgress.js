const mongoose = require('mongoose');
const courseProgress=new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,                    //Refers to the course Schema
                                          //Required   
        ref:"Course",                                      //Refers to the Course Schema
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,                    //Refers to the video Schema
        ref:"SubSection",                                    //Refers to the SubSection Schema
    }
]
})
module.exports=mongoose.model("CourseProgress",courseProgress);               //Exports the CourseProgress Schema