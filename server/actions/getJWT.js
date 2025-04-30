  const jwt=require("jsonwebtoken")
  exports.getJWT = (user) =>{
    return {
        email:user.email,
        id:user._id,
        accountType:user.accountType,
    }
     
  }
  module.exports = getJWT;