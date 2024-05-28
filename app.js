const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const db=require('./config/mongoose')



app.use(express.json())
app.use(express.urlencoded())

app.use('/api',require('./routes'))


const port=process.env.port

app.listen(port,(err)=>{
    if(err){console.log(`Error in running server`)}
    else{console.log(`Server is running at port : ${port}`)}
})





