const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth=require("../../middleware/auth")

router.get("/privatefeed",auth,async(req,res) =>{
    try{
        let user = await User.findById(req.user.id);
        user.skills=user.skills.map(v => v.toLowerCase())
        const feed = await Post.find({tags:{ $in:user.skills}}).hint('tags_1').limit(100)
        res.status(200).json(feed)
    }catch(err){
        res.status(400).json(err.message)
        console.error(err.message)
    }
})
router.get("/publicfeed",async(req,res)=>{
    try{
        const feed = await Post.find().hint('date_-1').limit(100)
        res.status(200).json(feed)
    }catch(err){
        res.status(400).json(err.message)
        console.error(err.message)
    }
})
module.exports = router