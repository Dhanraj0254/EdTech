
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightText from '../Components/core/HomePage/HighlightText';
import CTAButton from "../Components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../Components/core/HomePage/CodeBlocks";
import Footer from "../Components/common/footer";
import TimelinesSection from "../Components/core/HomePage/TimelinesSection";
import LearningLanguageSection from "../Components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/core/HomePage/InstructorSection";
import ExploreMore from "../Components/core/HomePage/ExploreMore";
import Navbar from "../Components/common/Navbar";
const  Home=()=>{
    return(
        <div>
       <Navbar/>
        {/* Section 1*/}
        <div className=" relative mx-auto flex flex-col w-11/12 items-center gap-8  text-white max-w-maxContent">
        <Link to={"/signup"} className=" mt-16">
          <div className="   group mx-auto mt-0 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
            Empower Your Future with 
            <HighlightText text ={"Coding Skills"}/>
        </div>
        {/*subHeading*/}
        <div className="mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
        With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        
        <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>
         <CTAButton active={false} linkto={"/login"}>
            Book a Demo
         </CTAButton>
        </div>
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
            <video className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
            >
                <source src={Banner} type="video/mp4" />
            </video>
        </div>
        {/* code section 1*/}
        <div>
    <CodeBlocks
        position={"lg:flex-row"}
        heading={
            <div className="text-4xl font-semibold">
                Unlock Your 
                <HighlightText text={"coding potential "}/>
                  with our online courses
             </div>
        }
        subheading={
             "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={
                {
                    btnText:"Try it Yourself",
                    linkto:"/signup",
                    active:true,
                }
            }
            ctabtn2={
                {
                    btnText:"Learn More",
                    linkto:"/login",
                    active:false,
                }
            }
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
             backgroundGradient={<div className=" inset-0 bg-gradient-to-r from-blue-500 to-purple-500 codeblock1 absolute "></div>}
    />

        </div>
           {/* code section 2*/}
           <div>
    <CodeBlocks
        position={"lg:flex-row-reverse"}
        heading={
            <div className=" w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start 
                <HighlightText text={`coding  in second`}/>
                
             </div>
        }
        subheading={
             "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={
                {
                    btnText:"Continue Lesson",
                    linkto:"/signup",
                    active:true,
                }
            }
            ctabtn2={
                {
                    btnText:"Learn More",
                    linkto:"/login",
                    active:false,
                }
            }
            // inset-0 bg-gradient-to-r from-green-400 to-teal-500
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-white"}
            backgroundGradient={<div className=" inset-0 bg-gradient-to-r from-pure-greys-900 to-teal-500
 codeblock2 absolute"></div>}
    />

        </div>
        <ExploreMore/>

        </div>
         {/* Section2 */}
    <div className="bg-pure-greys-5 text-richblack-700">
      <div className="homepage_bg h-[310px]">

       <div className="w-11/12 max-w-maxContent flex  flex-col items-center gap-5 mx-auto">
       <div className="h-[150px]"></div>
<div className="flex flow-row gap-7 text-white">
    <CTAButton active={true} linkto={"/signup"}>
       <div className="flex flex-row items-center gap-2">
        Explore Full Catalog
        <FaArrowRight/>
       </div>
       
    </CTAButton>
    <CTAButton active={false} linkto={"/signup"}>
    <div>
        Learn More
    </div>
    </CTAButton>


</div>


</div>

            </div>

            <div className=" mx-auto w-11/12 max-w-maxContent flex-flex-col items-center justify-between gap-7">
                <div className="flex flex-row gap-5 mb-10 mt-[90px]">
                    <div className="text-4xl font-semibold w-[45%]">
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"}/>
                    </div>

                    <div className="flex flex-col gap-10 w-[40%] items-start">
                    <div className="text-[16px] ">
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                              Learn More
                    </CTAButton>

                </div>
                </div>


              
                <TimelinesSection/>
                <LearningLanguageSection/>
                
            </div>


         </div>
          {/* Section 3 */}
          <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8
           bg-richblue-900 first-letter text-white ">
            <InstructorSection/>
        <h2 className="text-center text-4xl font-semibold"> review from Other Learners</h2>
              {/* Review slider */}
          </div>
           {/* footer */}
          <Footer/>
          </div>
    )
} 
export default Home;