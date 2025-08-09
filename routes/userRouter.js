const express=require('express')
const router=express.Router()
const User=require('../module/user')
const auth=require('../controller/authController')
const authMiddleware=require("../middleware/authMiddleware")

router.post('/user',auth.register)
router.get('/login',auth.login)
router.get('/logout',auth.logout)
router.get('/dashboard',authMiddleware,auth.dashBoard)

module.exports=router