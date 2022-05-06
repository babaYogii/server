
const jwt = require('jsonwebtoken');
const User =require('../model/userSchema');


const authenticate=async (req,res,next)=>{
  try {
      const token = req.cookies.jwtoken;
      const verifyToken=jwt.verify(token,process.env.SECREATE_KEY);

    const rootUser= await User.findOne({_id:verifyToken._id,"tokens.token":token})
    console.log(rootUser);
    if(!rootUser){throw new Error('User not found')}
    req.token=token;
    req.rootUser=rootUser;
    req.rootID=rootUser._id;
    console.log(req.rootID);
    next();

  } catch (error) {
      console.log(error);
      res.status(401).send("Unauthorised : token missing")
  }


}

module.exports=authenticate;