const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const SECRET="cognifyzsecret";

router.post("/register",async(req,res)=>{

try{

const {name,email,password}=req.body;

const exist=await User.findOne({email});

if(exist){

return res.json({message:"Email already exists"});

}

const hash=await bcrypt.hash(password,10);

const user=new User({

name,

email,

password:hash

});

await user.save();

res.json({

message:"User Registered Successfully"

});

}

catch(err){

res.status(500).json(err);

}

});

router.post("/login",async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.json({

message:"User Not Found"

});

}

const match=await bcrypt.compare(password,user.password);

if(!match){

return res.json({

message:"Wrong Password"

});

}

const token=jwt.sign(

{id:user._id},

SECRET,

{expiresIn:"1h"}

);

res.json({

message:"Login Successful",

token

});

}

catch(err){

res.status(500).json(err);

}

});

module.exports=router;