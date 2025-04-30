import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import { useLocation } from 'react-router-dom'
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
 const UpdatePassword = () => {
    const dispatch=useDispatch()
    const location=useLocation();
    const[formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword, setShowPassword] = useState(false)
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const{loading}=useSelector((state)=>state.auth)
    const[password,confirmPassword]=formData
    const handleOnChange=(e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))}
        const handleOnSubmit=(e)=>{
            e.preventDefault()
            const token=location.pathname.split("/").at(-1)
            // if(password!==confirmPassword){
            //     alert("Password and confirm password do not match")
            //     return
            // }
            // Call the API to update the password
            // Assuming you have a function called updatePassword that takes the new password as an argument
            dispatch(resetPassword,confirmPassword,token);
        }
  return (
    <div>
        {
            loading?(
                <div>Loading...</div>

            ):(
                <div>
                    <h1>Choose new password</h1>
                    <p>Almost done.Enter your new password and your all set</p>
                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor=""
                        >
                            <p>New Password <sup className='text-red'>*</sup></p>
                            <input 
                                required
                            type={showPassword?"text":"password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                        
                             />
                             <span>
                                {
                                    showPassword?<AiFillEyeInvisible/>
                                    :<AiFillEye/>
                                }
                             </span>
                        </label>
                    </form>
                </div>
            )
        }
    </div>
  )
}
export default UpdatePassword;
