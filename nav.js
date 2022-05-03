const mongoose=require("mongoose");
const user = new mongoose.Schema({name:{type:String}})
const user1=mongoose.model('user',user);


module.exports=user1;
