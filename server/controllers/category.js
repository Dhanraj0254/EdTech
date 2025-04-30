const Category=require('../models/Category');
const { Mongoose } = require("mongoose");
//create tag handler function
exports.createCategory=async(req,res)=>{
    try{
        const{name,description}=req.body; //extracting the name,description and course from the request body
        //create a tag
        //validation
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields",
            });
        }
        // create entry in db
        console.log("ji haaa..");
        const tagDetails=await Category.create({        //creating the tag in the database
            name,
            description
        });
       console.log(tagDetails);
       
        //return success response
        res.status(200).json({
            success:true,
            message:"Category Created Successfully",
            
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating the category",
        });
    }
};

//get all tags handler function
exports.showAllCategories=async(req,res)=>{
    try{
         const allTags=await Category.find({},{name:true,description:true}); //fetching all the tags from the database
         //return success response
        res.status(200).json({
            success:true,
            message:"All Category returned successfully",
            allTags,   
    });
}
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching the categories",
        });
    }
};


//category pagedetails handler
exports.categoryPageDetails=async(req,res)=>{
    try{
   ////get categoryId
   const {categoryId}=req.body;
   //get courses for specified categoryid
   const selectedCategory=await Category.findById(categoryId)
                                                 .populate("courses")
                                                 .exec();
  //validation
  if(!selectedCategory){
    return res.status(400).json({
        success:false,
        message:"Data not Found",
    });
  }
  //get courses for different categories
     const differentCategories=await Category.find({
                                      _id:{$ne:categoryId},       //ne means not equal
                                })
                                .populate("courses")
                                .exec();
     //get top selling courses
     //HW:  find top 10 courses
     //return response

     return res.status(200).json({
        success:true,
        data:{
            selectedCategory,
            differentCategories,
        },
     })


    }
    catch(error){
           console.log(error);
           return res.status(500).json({
            success:false,
            message:error.message,
           })
           
    }
}