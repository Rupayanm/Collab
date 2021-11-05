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

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

// @route POST api/profile/updateninfo
// @desc POST skills 
// @access Private
router.post(
  '/updateinfo',
  auth,
  // check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      website :
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '' ,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };
    profileFields.skills= profileFields.skills.map(v=>v.toLowerCase())

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await User.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true,  setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);


// @route POST api/profilePosts/:id
// @desc POST skills 
// @access Private
router.get('/profilePosts/:id',auth,async(req,res)=>{
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}
    results.next = {
      page: page + 1,
      limit: limit
    }
  
    results.previous = {
      page: page - 1,
      limit: limit
    }
    
  const id = req.params.id
  try{
    const posts = await Post.find({postedBy:id}).skip(startIndex).limit(limit).exec()
    results.posts = posts
    return res.status(200).json(results)
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }

})
module.exports = router;
