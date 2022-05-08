const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../middleWare/authenticate')


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
    console.log(ismatch);

    const token = await userlogin.generateAuthToken();
    
    res.cookie('jwtoken',token,{
        expires:new Date(Date.now + 158920),
        httpOnly:true
    })

 if(userlogin){
    if(!ismatch){
    res.json({message:"Check user id or password "})
    }
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

// About us

router.get('/about',authenticate,(req,res)=>{
    console.log('about page')
    res.send(req.rootUser);
})


//data for contact and home

router.get('/getData',authenticate,(req,res)=>{
    console.log('contact page')
    res.send(req.rootUser);
})

//contact us page
router.post('/contact',authenticate,async(req,res)=>{
    console.log(req)
    try {
       const {uemail,uname,umobile,umessage}=req.body;
       if(!uemail ||!umessage||!uname||!umobile){
           res.status(401).json({error:"please fill form"})
       }
       console.log(umessage);
       const usercontact= await User.findOne({_id:req.rootID});

       if(usercontact){
           const usermessage=await usercontact.addMessage(uname,uemail,umessage,umobile);
          await usercontact.save();
          res.status(201).json({mesasge:"Message saved"})
       }
       
    } catch (error) {
        console.log(error)
    }
})


// Logout functionality

router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('user logout sucessfully');
})


module.exports=router;


