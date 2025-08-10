const express=require('express')
const router=express.Router()
const User=require('../module/user')
const auth=require('../controller/authController')
const authenticateUser=require("../middleware/authMiddleware")

router.post('/user',auth.register)
router.get('/login',auth.login)
router.get('/logout',auth.logout)
router.get('/dashboard',authenticateUser,auth.dashBoard)

module.exports=router