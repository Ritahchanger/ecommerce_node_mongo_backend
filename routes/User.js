const express = require("express");
const User = require('../models/users.model');
const router = express.Router();

const users=[
    {
        firstName:"Dennis",
        lastName:"Peter",
        username:"Ritahchanger",
        email:"dennispeter2580@gmail.com",
        idNo:"12345678",
        password:"2580Mboi"
    },
    {
        firstName:"Mutunga",
        lastName:"Kelvin",
        username:"kelvinchanger",
        email:"kelvinmunyao2580@gmail.com",
        idNo:"12345678",
        password:"234543521"
    },
    {
        firstName:"Gibson",
        lastName:"Daniel",
        username:"gibson@34",
        email:"gibson@gmail.com",
        idNo:"12345678",
        password:"234543521"
    },
    {
        firstName:"Lucy",
        lastName:"Mutunga",
        username:"lucymutuli",
        email:"lucy@gmail.com",
        idNo:"2345123",
        password:"13324444"
    }
]

router.get('/get_users',(req,res)=>{
    try{
        console.log("{msg:user found}");
        res.status(200).send(users);
    }catch(error){
        res.status(400).json({msg:`${error.message}`});
    }
})
router.post('/post_users',async(req,res)=>{
    
})








module.exports = router;