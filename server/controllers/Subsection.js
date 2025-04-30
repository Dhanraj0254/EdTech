const SubSection=require("../models/SubSection");
const Section=require("../models/Section");

//create subsection
exports.createSubSection=async(req,res)=>{
    try{
          // fetch data
          const{sectionId,title,timeDuration,description}=req.body;

          //extract file
          const video=req.files.videoFile;
          //validation
          if(!sectionId||!title||!timeDuration||!description|| !video){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            });
          }
          //upload video to cloudinary    take secure url
          const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
          //create sub section
          const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            video:uploadDetails.secure_url,
          })
          //update section with  this sub section ObjectId
          const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
                                                           {$push:{
                                                               SubSection:subSectionDetails._id,
                                                           }},
                                                           {new:true}
                                                                );
         //hw:log populated section here, after adding populate query                                                       
          //return res

return res.status(200).json({
  success:tru,
  message:"Sub section Created Sucessfully",
  updatedSection,
});
    }
    catch(error){
       return res.status(500).json({
        success:false,
        message:"Internal Server error",
        error:error.message,
       });
    }
}
// hw: update subsection
  exports.updateSubSection=async(req,res)=>{
    try{
      //data input 
      const{sectionId,subSectionId,title,description}=req.body;
       const subSection=await SubSection.findById(subSectionId);
      //data validation
      if(!subSection){
        return res.status(404).json({
          success:false,
          message:"subsection not found",
        });
      }
      if(title!=undefined){
        subSection.title=title;
      }
      if(description!=undefined){
        subSection.description=description;
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
      await subSection.save();
      //update data
      const updateSection =await Section.findById(sectionId).populate("subsection");
      console.log("updated section :", updateSection);
      
      //return res
      return res.status(200).json({
        success:true,
        message:"subsection updated successfully",
        Data:updateSection,
      })


    }catch(error){
         return res.status(500).json({
          success:false,
          message:"An error occur while updating section"
         })
    }
  }
//hw: delete sub section
exports.deleteSubSection=async(req,res)=>{
  try{
       const {sectionId,subSectionId}=req.body;
       await Section.findByIdAndUpdate( { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSecton=await SubSection.findByIdAndDelete({_id:subSectionId})
      if(!subSection){
        return res.status(404).json({
          success:false,
          message:"Subsection not found",
        });
      }
      //find update section
      const updatedSection=await Section.findById(sectionId).populate("subSection");
      //return response
      return res.status(200).json({
        success:true,
        message:"Subsection successfully deleted",
        data:updatedSection,
      })
  }
  catch(error){
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    });  
  }
}