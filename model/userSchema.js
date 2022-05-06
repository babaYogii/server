const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    
    uemail:{
        type:String,
        required:true
    },
    umobile:{
        type:Number,
    },
    upassword:{
        type:String,
        required:true
    },
    cupassword:{
        type:String,
        required:true
    },
    uprofession:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    },
    umessages:[{
   uname:{
            type:String,
            require:true
           } , 
    uemail:{
      type:String,
            required:true
        },
    umobile:{
            type:Number
        },
    umessage:{
            type:String
        }    
    }]

})

//passhashing


userSchema.pre('save',async function(next){
    if(this.isModified('upassword')){
        this.upassword=await  bcrypt.hash(this.upassword,12);
        this.cupassword=await bcrypt.hash(this.cupassword,12);
    }
    next();
})


//Generate token
userSchema.methods.generateAuthToken =async function(){
    try{
      let token = jwt.sign({_id:this._id},process.env.SECREATE_KEY);
this.tokens=this.tokens.concat({token:token});
await this.save();
return token;
console.log(token);
    }catch(err){
        console.log(err)
    }
}

//storing message
userSchema.methods.addMessage= async function (uname,uemail,umessage,umobile){
    try{
      this.umessages =this.umessages.concat({uname,uemail,umessage,umobile})
      await this.save();
      return this.umessages

    }catch(error){
        console.log(error)
    }

}




const Users= mongoose.model('USER',userSchema);

module.exports=Users;

