const express=require('express')
const app=express()
const db=require('./config/db')
const mongoose=require('mongoose')
const User=require('./module/user')
const router=require('./routes/userRouter')
app.use(express.json())

app.use('/api',router)


app.listen(3000,()=>{
    console.log('Server is running on port 3000') 
})


