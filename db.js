const mongoose=require('mongoose')
const db=mongoose.connect('mongodb+srv://gowthamabi1412:Gowtham2131%40@office.lrtep.mongodb.net/')
            .then(() => {
                console.log("Database connected successfully")
            })
            .catch((err)=>{
                console.error("Database connection failed", err)
            })
            module.exports=db