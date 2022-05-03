const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


require('../db/connection');


const User = require('../model/userSchema');


router.get('/',(req,res)=>{
    res.send("hello from server router");
});

// router.post('/register',  (req,res)=>{
   
//     const {uname,upassword,cupassword,email,umoblie}=req.body;
// if(!uname || !upassword || !cupassword || !email || !umoblie){

// return res.status(400).json({error:'plz fill all details'});
// }

// User.findOne({email:email}).then((userexist)=>{
//     if(userexist){
//         return res.status(422).json({error:"Aleready exist"});
//     }
//     const user= new User({uname,upassword,cupassword,email,umoblie});
//     user.save().then(()=>{
//         res.status(201).json({message:"Done for now"})
//     }).catch((err)=>{
//        res.status(500).json({error:"failed to load data"})
//     })

// }).catch((err)=>{
// res.status(400).json(err)

// })




//     // res.json({message:req.body})



    
// })
router.post('/register', async (req,res)=>{
    
    const {uname,upassword,cupassword,uemail,umobile,uprofession}=req.body;
    console.log(uname,upassword,cupassword,uemail,umobile,uprofession);
if(!uname || !upassword || !cupassword || !uemail || !umobile || !uprofession){

return res.status(400).json({error:'plz fill all details'});
}
try{

    const userexist=await User.findOne({uemail:uemail})
    if(userexist){
        return res.status(422).json({error:"Already exist"});
    }
    if(upassword!==cupassword){
        res.status(411).json({message:"Password and Confirm password does not match"});
        return
    }

    const user= new User({uname,upassword,cupassword,uemail,umobile,uprofession});
        
        

     await user.save();
        return  res.status(201).json({message:"Done for now"})
        

}catch(err){
console.log(err)
}
    // res.json({message:req.body})
    
})


//login route
router.post('/signin', async (req,res)=>{
    try {
        const {upassword,uemail}=req.body;
        if(!upassword || !uemail)
        return res.json({message:"error"})

        const userlogin= await User.findOne({uemail:uemail});
    console.log(userlogin);
    const ismatch =await bcrypt.compare(upassword, userlogin.upassword);

    const token = await userlogin.generateAuthToken();
    
    res.cookie('jwtoken',token,{
        expires:new Date(Date.now + 15892000000),
        httpOnly:true
    })

 if(userlogin){
    if(!ismatch)
    res.json({message:"Check user id or password "})
    else{
        res.json({message:"Done loged in sucessfully"})
    }
 }else{
     res.status(400).json({error:"Invalid credenitals"})
 }
    }
    
    catch (error) {
        console.log(error)
        res.status(400).json({message:"Fake user"})
    }
})


module.exports=router;


