const Course=require('../models/Course');   //importing the Course model
const Category=require('../models/Category');         //importing the Tag model
const User=require('../models/User');       //importing the User model
const {uploadImageToCloudinary}=require('../utils/imageUploader');  //importing the image uploader function
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
//create course handler function
exports.createCourse=async(req,res)=>{
    try{
//data fetch from request body
let {
  courseName,
  courseDescription,
  whatYouWillLearn,
  price,
  tag: _tag,
  category,
  status,
  instructions: _instructions,
} = req.body
 //get thumbnail
 const thumbnail =req.files.thumbnailImage;
 console.log('Value of _tag:', _tag);
 
    // check for instructor 
    const userId=req.user.id;   //get user id from request
    const tag = typeof _tag === 'string' ? { name: _tag } : _tag;
    const instructions = JSON.parse(_instructions);
  //  const instructorDetails=await User.findById(userId);  //find user by id
    console.log("tag", tag);
    console.log("instructor Details:",instructions);
    console.log(courseName);
    console.log(courseDescription);
    console.log(tag.length);
    console.log(whatYouWillLearn);
    console.log(price);
    
    console.log(category);
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category 
     
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    // todo verify that userId and instructorFetails._id are same or different?
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    
    
    if(!instructorDetails){
        return res.status(404).json({
            success:false,
            message:"Instructor not found",
        });
    }
    //check given tag is valid or not
    const tagDetails=await Category.findById(tag);   //tag db me referece id se tag find karo tag ek object id hai
    if(!tagDetails){
        return res.status(404).json({
            success:false,
            message:"Tag not found",
        });
    }
    //upload image to cloudinary
    const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

    //create  an entry for new course
    const newCourse=new Course({
        courseName,
        courseDescription,
        instructor:userId,  //instructor:instructorDetails._id also use
        whatYouWillLearn:whatYouWillLearn,
        price,
        thumbnail:thumbnailImage.secure_url,
        tag:tagDetails._id,  /// 
    });
    //add the new course to the user schemas of instructor
    await User.findByIdAndUpdate(
       {_id:instructorDetails._id,},        
        {
  $push:{
        courses:newCourse._id,     //course ke array ke nadar new course ki id add krna 
    }
            },
            {new:true},    //return the updated document  
        );
        //update the TAG schema with the new course
        //TODO hw


        //return reponse
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });
    
       
       
        
    
}
    catch(error){
console.log("Error in createCourse:",error);
return res.status(500).json({
    success:false,  
    message:"Internal server error",
    error:error.message,
});

    }
}
//get all courses handler function

exports.getAllCourses=async(req,res)=>{
    try{
        //TODO  change the below student 
     const allCourses=await Course.find({});          //find all courses and populate the tag and instructor
     return res.status(200).json({
        success:true,
        message:"Data for all courses fetched successfully",
        data:allCourses,
     })
    
                                }
    catch(error){
        console.log(
            "Error in showAllCourses:",error);
        return res.status(500).json({
            success:false,
            message:"can not fetch course data",
            error:error.message,
        });
        
    }
}
//function to create a new course


//ger CourseDetails
exports.getCourseDetails=async(req,res)=>{
    try{
//get id
const {courseId}=req.body;
//find course details
const CourseDetails=await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },

                                            }
                                        )
                                        .populate("category")
                                        .populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .exex();

    //validation
    if(!CourseDetails){
        return res.status(400).json({
            success:false,
            message:`could not find the course with ${courseId}`,

        });
    }      
    //return response
return res.status(200).json({
    success:true,
    message:"Course details fetched successfully",
    data:CourseDetails,
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
//Edit Couorse
exports.editCourse=async(req,res)=>{
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
    
        if (!course) {
          return res.status(404).json({ error: "Course not found" })
        }
    
        // If Thumbnail Image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.thumbnailImage
          const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
              course[key] = JSON.parse(updates[key])
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
    
        res.json({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
    }
    exports.getFullCourseDetails = async (req, res) => {
        try {
          const { courseId } = req.body
          const userId = req.user.id
          const courseDetails = await Course.findOne({
            _id: courseId,
          })
            .populate({
              path: "instructor",
              populate: {
                path: "additionalDetails",
              },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            })
            .exec()
      
          let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
          })
      
          console.log("courseProgressCount : ", courseProgressCount)
      
          if (!courseDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${courseId}`,
            })
          }
      
          // if (courseDetails.status === "Draft") {
          //   return res.status(403).json({
          //     success: false,
          //     message: `Accessing a draft course is forbidden`,
          //   });
          // }
      
          let totalDurationInSeconds = 0
          courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
              const timeDurationInSeconds = parseInt(subSection.timeDuration)
              totalDurationInSeconds += timeDurationInSeconds
            })
          })
      
          const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
      
          return res.status(200).json({
            success: true,
            data: {
              courseDetails,
              totalDuration,
              completedVideos: courseProgressCount?.completedVideos
                ? courseProgressCount?.completedVideos
                : [],
            },
          })
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          })
        }
      }
      exports.getInstructorCourses = async (req, res) => {
        try {
          // Get the instructor ID from the authenticated user or request body
          const instructorId = req.user.id
      
          // Find all courses belonging to the instructor
          const instructorCourses = await Course.find({
            instructor: instructorId,
          }).sort({ createdAt: -1 })
      
          // Return the instructor's courses
          res.status(200).json({
            success: true,
            data: instructorCourses,
          })
        } catch (error) {
          console.error(error)
          res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
          })
        }
      }
      // Delete the Course
      exports.deleteCourse = async (req, res) => {
        try {
          const { courseId } = req.body
      
          // Find the course
          const course = await Course.findById(courseId)
          if (!course) {
            return res.status(404).json({ message: "Course not found" })
          }
      
          // Unenroll students from the course
          const studentsEnrolled = course.studentsEnroled
          for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
              $pull: { courses: courseId },
            })
          }
      
          // Delete sections and sub-sections
          const courseSections = course.courseContent
          for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
              const subSections = section.subSection
              for (const subSectionId of subSections) {
                await SubSection.findByIdAndDelete(subSectionId)
              }
            }
      
            // Delete the section
            await Section.findByIdAndDelete(sectionId)
          }
      
          // Delete the course
          await Course.findByIdAndDelete(courseId)
      
          return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
          })
        } catch (error) {
          console.error(error)
          return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
          })
        }
      }
      


