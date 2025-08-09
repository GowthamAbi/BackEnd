const mongoose=require('mongoose')
require('dotenv').config()

const db=mongoose.connect(process.env.URL)
            .then(() => {
                console.log("Database connected successfully")
            })
            .catch((err)=>{
                console.error("Database connection failed", err)
            })
            module.exports=db