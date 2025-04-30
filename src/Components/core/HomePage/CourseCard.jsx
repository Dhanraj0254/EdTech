import React from 'react'
import { HiUser } from "react-icons/hi";
import { ImTree } from "react-icons/im";
 const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div
    className={`w-[360px] lg:w-[30%] ${currentCard===cardData?.heading?
      "bg-white shadow-[10px_10px_0px_0px] shadow-blue-200"
    :"bg-richblack-800"} text-richblack-25 h-[300px] box-border cursor-pointer`}
    onClick={()=>setCurrentCard(cardData?.heading)}>
<div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'>
    <div className={  `${currentCard===cardData?.heading&&"text-richblack-800"}  font-semibold text-[20px]`}>
  {cardData?.heading}
    </div>
    <div className='text-richblack-400'>{cardData?.description} </div>
</div>

<div className={`flex justify-between ${currentCard===cardData?.heading?"text-blue-300":"text-richblack-300"} 
font-medium px-6 py-3`}>
{/* Level 1 */}
<div className='flex items-center gap-2 text-[16px]'>
    <HiUser/>
    <p>{cardData?.level}</p>
</div>

{/* Flow Chart*/}
<div className='flex items-center gap-2 text-[16px]'>
<ImTree/>
<p>{cardData?.lessionNumber}Lesson</p>
</div>


</div>

    </div>
  )
}
export default CourseCard;
