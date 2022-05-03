const express= require('express');
const path=require('path')


require('dotenv').config()
require('./db/connection')
// const middleware=require('middleware');

const app=express();

app.use(express.json());
app.use(require('./router/auth'))


staticpath=path.join(__dirname,'../mernbackend/public');

//built in 
// app.use(express.static(staticpath));



//  middleware=(req,res,next)=>{
//     console.log('hello my middleware');
//     next();
// }



app.listen(4000,()=>{
    console.log("Listening at 4000")
})



