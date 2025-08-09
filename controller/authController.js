const User=require('../module/user')   
const bcrypt=require('bcryptjs')
const res = require('express/lib/response')
const jwt=require('jsonwebtoken')

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
        const user=await User.findOne({email})
        const isMatch=await bcrypt.compare(password,user.password)
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({message:"Password doesn't match"})
        }

        const token=await jwt.sign({userId:user.id},process.env.JWT_SECRETKEY,{expiresIn:"1hr"})
                res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
            });
        res.status(200).json({message:"Successfully login",token:token,user:user})
    }

    exports.logout=()=>{
        res.clearCookie('token')
        res.status(200).json({message:"Successfull logout"})
    }
    exports.dashBoard=async(req,res)=>{
        res.status(201).json({user:User.findById(req.user.id)})
        
    }

 