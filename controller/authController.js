const User=require('../module/user')   
const bcrypt=require('bcryptjs')


    exports.register=async(req,res)=>{
    
        const {name,email,password}=req.body
    
        if(!name||!email||!password){
            return res.status(400).json({messasge:"Please provide all required fields"})
        }
        const hashPassword=await bcrypt.hash(password,10)
        
        const user= new User({name,email,password:hashPassword})
        const userEmail=await User.findOne({email})
        if(userEmail){
            return res.json({message:"User already exists"})
        }
        const saved=await user.save()
            .then((result)=>{
                res.status(201).json({message:"User registered successfully",user:result})
            })
            .catch((err)=>{
                console.error(err)
                res.status(500).json({message:"Internal server error"})
            })
            
    }
    
    exports.login=async(req,res)=>{
        const{email,password}=req.body
        const userpassword=await User.findOne({password})
        if(password!=userpassword.password){
            return res.status(400).json({message:"Password doesn't match"})
        }
        res.status(200).json({message:"Successfully login"})
    }

    exports.dashBoard=async(res,req)=>{
        
    }

 