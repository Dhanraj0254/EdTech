import "./index.css";
import {Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector ,useState} from "react-redux";
import OpenRoute from "./Components/core/Auth/OpenRoute"
import Home from "./pages/Home";
  import Login from "./pages/Login"
 import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
//import Catalog from "./pages/Catalog"
function App(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return(
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
</Routes>
    </div>
  )
}
export default App;