const express=require('express')
const app=express()
const db=require('./db')
const mongoose=require('mongoose')

app.use(express.json())

app.get('/',(req=9,res)=>{
    console.log('Hello World')
    res.end('Hello World')
}
)

app.listen(3000,()=>{
    console.log('Server is running on port 3000') 
})


