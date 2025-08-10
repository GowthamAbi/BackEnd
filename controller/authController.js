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
    
   exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Password doesn't match" });
        }

        // ✅ Correct token expiration format ("1h" not "1hr")
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRETKEY,
            { expiresIn: "1h" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({
            message: "Successfully login",
            token,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" }); // ✅ Return error
    }
};


    exports.logout=(req,res)=>{
        res.clearCookie("token")
        res.status(200).json({message:"Successfull logout"})
    }
    exports.dashBoard=async(req,res)=>{
        try{
            const user=await User.findById(req.user.id)
             res.status(201).json({user})
        }catch(err){console.log(err)}
       
       
        
    }

 