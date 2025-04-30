const mongoose = require('mongoose');
require('dotenv').config();
exports.connect = () => {
  // Connecting to the database
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   // useCreateIndex: true,
  })
  .then(()=>console.log("DB Connection Successfully"))
  .catch((error)=>{
    console.log("DB Connection Failed");
    console.log(error);
    process.exit(1);
  });
};