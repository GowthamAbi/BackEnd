const express=require('express')
const jwt=require('jsonwebtoken')

const authMiddleware=async(res,req,next)=>{
    try{
        let token=req.cookies?.token
        if(!token&&req.headers.authorization?.startWith("Bearer ")){
            token=req.headers.authorization.split(" ")[1]
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRETKEY)
        req.user={id:decoded.userId||decoded.id}
        next()
    }catch(err){
        console.log(err)
    }
    
    
}

module.exports=authMiddleware