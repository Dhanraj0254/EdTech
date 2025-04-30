const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,                   //Required 
    },
    description:{
        type:String,
        required:true,
        trim:true,                   //Required 
    },
    course:
    [{
        type:mongoose.Schema.Types.ObjectId,
        required:true,                   //Required 
        ref:"Course"                                    //Refers to the Course Schema
    }
]
});
module.exports=mongoose.model("Category",categorySchema);               //Exports the Tag Schema