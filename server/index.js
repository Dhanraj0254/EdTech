const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database=require("./config/database");
const cookieParser=require("cookie-parser");
        // backend jo frontend ki request ko interaction kre import cors
        const cors=require("cors");
        const {cloudinaryConnect}=require("./config/cloudinary");
        const fileUpload=require("express-fileupload");
        const dotenv=require("dotenv");
dotenv.config();
        const PORT=process.env.PORT||4000;


        //database connect
        database.connect();

        //middleware
        app.use(express.json());
        app.use(cookieParser());

        app.use(
            cors({
                origin:"http://localhost:3000",
                credentials:true,
            })
        )
        app.use(
            fileUpload({
                useTempFiles:true,
                tempFileDir:"/tmp",
            })
        )
        //cloudinary connection
    cloudinaryConnect();

    //routs
    app.use("/api/v1/Auth",userRoutes);
    app.use("/api/v1/Profile",profileRoutes);
    app.use("/api/v1/Course",courseRoutes);
    //app.use("/api/v1/Payment",paymentRoutes);

    //def route
    app.get("/",(req,res)=>{
        return res.json({
            success:true,
            message:"Your server is up and running......"
        })
    })


    app.listen(PORT,()=>{
        console.log(`app is running at ${PORT}`);
        
    })
