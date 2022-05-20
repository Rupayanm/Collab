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
const util = require('util')

router.get("/privatefeed",auth,async(req,res) =>{
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = {}
      results.next = {
        page: page + 1,
        limit: limit
      }
    
      results.previous = {
        page: page - 1,
        limit: limit
      }
    try{
        let user = await User.findById(req.user.id);
        user.skills=user.skills.map(v => v.toLowerCase())
        let feedData= await Post.find({tags:{ $in:user.skills}}).limit(limit).skip(startIndex).lean().exec()
        const feed=[]
        for (let post in feedData){
          const author = await User.findById(feedData[post].postedBy).select('name email avatar').lean()
          if (feedData[post].likes && (req.user.id in feedData[post].likes)){
            feed.push({...feedData[post],status:"LIKED",...author})
          }
          else if (feedData[post].dislikes && (req.user.id in feedData[post].dislikes)){
            feed.push({...feedData[post],status:"DISLIKED",...author})
          }
          else{
          feed.push({...feedData[post],status:"NULL",...author})
        }
        }
        results.feed=feed
        res.status(200).json(results)
    }catch(err){
        res.status(400).json(err.message)
        console.error(err.message)
    }
})
router.get("/publicfeed",async(req,res)=>{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const feed=[]
        const results = {}
          results.next = {
            page: page + 1,
            limit: limit
          }
          results.previous = {
            page: page - 1,
            limit: limit
          }
        try {
          const feedData = await Post.find().limit(limit).skip(startIndex).lean().exec()
          for (let post in feedData){
            const author = await User.findById(feedData[post].postedBy).select('name email avatar').lean()
            feed.push({...post , ...author})
          }
            results.feed=feed
            res.status(200).json(results)
          } catch (e) {
            res.status(500).json({ message: e.message })
          }
    })
module.exports = router