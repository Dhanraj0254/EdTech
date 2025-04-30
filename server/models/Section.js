const mongoose=require('mongoose');
const SubSection = require('./SubSection');
const sectionSchema=new mongoose.Schema({
    sectionName:{
        type:String,
    },
    SubSection:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,                   //Required 
        ref:"SubSection",                                    //Refers to the SubSection Schema
    }
],
});
module.exports=mongoose.model("Section",sectionSchema);               //Exports the Section Schema