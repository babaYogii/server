const mongoose=require('mongoose');


const DB="mongodb+srv://yogesh:yogesh@cluster0.hqr3y.mongodb.net/mernstack?retryWrites=true&w=majority"
// const D1B="mongodb://localhost:27017/hurry"
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("Sucessfull")
).catch((err)=>{
    console.log(err);
})


