const express=require('express')
const router=express.Router()
const User=require('../module/user')
const auth=require('../controller/authController')

router.post('/user',auth.register)
router.get('/login',auth.login)
router.get('/dashboard',auth.dashBoard)

module.exports=router