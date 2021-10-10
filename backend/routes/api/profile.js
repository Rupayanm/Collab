const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
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

// @route POST api/profile/skills
// @desc POST skills 
// @access Private
router.post("/skills" ,
auth , 
check('skills', 'Skills is required').notEmpty().isArray(),
async(req, res) =>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const skills = req.body;
    let userData = await User.findOneAndUpdate(
      { user: req.user.id },
      { $set: skills },
      { new: true }
    ).select("-password")
    return res.status(200).json(userData)
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})
module.exports = router;
