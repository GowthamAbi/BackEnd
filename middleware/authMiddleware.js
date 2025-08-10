
const jwt=require("jsonwebtoken")


const authMiddleware=(req,res,next)=>{
    try{
        let token=req.cookies?.token
         
        console.log("🔹 Received Token:", token ? "✅ Present" : "❌ Missing"); // Debugging log
        if(!token&&req.headers.authorization?.startsWith("Bearer ")){
            token=req.headers.authorization.split(" ")[1]
        }
        console.log("🔹 Received Token:", token ? "✅ Present" : "❌ Missing"); // Debugging log

        if(!token){ return res.status(401).json({ message: "Unauthorized: No token provided" });}
        const decoded=jwt.verify(token,process.env.JWT_SECRETKEY)
        
        req.user={id:decoded.userId||decoded.id}
        console.log("Code Enter in next level")
        next()
    }catch(err){
        console.log(err)
    }
    
    
}

module.exports=authMiddleware
