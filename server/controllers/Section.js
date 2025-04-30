const Section=require("../models/Section");
const Course=require("../models/Course");


// create course 
exports.createSection=async(req,res)=>{
    try{
           //data fetch
           const {sectionName,courseId}=req.body;
           //data validation
           if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            });
           }
           //create section
           const newSection=await Section.create({sectionName});
           //update course with section ObjectId
           const updatedCourseSetails=await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                        $push:{
                                                            courseContent:newSection._id,
                                                        }
                                                    },
                                                );
 //HW: use populate to replace section /subsection both in the updatedCourseDetails
 //return response
 return res.status(200).json({
    success:true,
    message:"Section created Successfully",
 });                                               
                                                
}
    catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:"Unable to create section please try again",
    error:error.message,
  })
  
    }
}
exports.updateSection=async(req,res)=>{
    try{
//data input
const{sectionName,sectionId}=req.body;

//data validation 
if(!sectionName|| !sectionId){
    return res.status(400).json({
        success:false,
        message:'Missing Properties'
    });
}
//update data
const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
//return res
return res.status(200).json({
    success:true,
    message:'Section updated Successfully',
});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update section , please try again",
            error:error.message,
        });
    }
}

exports.deleteSection=async (req,res)=>{
    try{
   //get id --> sent id in parameters(params)
   const{sectionId}=req.params;

   //use findbyidanddelete
   await Section.findByIdAndDelete(sectionId);
   //todo  do we need to delete the entry schema 

   //return
   return res.status(200).json({
    success:true,
    message:"Section deleted Successfully"
   })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete section , please try again",
            error:error.message,
        });
    }
}