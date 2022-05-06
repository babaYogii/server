const express= require('express');
const path=require('path')
const cookieParser = require('cookie-parser')


require('dotenv').config()
require('./db/connection')
// const middleware=require('middleware');

const app=express();

app.use(cookieParser())
app.use(express.json());
app.use(require('./router/auth'))


staticpath=path.join(__dirname,'../mernbackend/public');

//built in 
// app.use(express.static(staticpath));







app.listen(4000,()=>{
    console.log("Listening at 4000")
})



