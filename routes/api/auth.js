const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const router = express.Router();

const jwtSecret = process.env.jwtSecret;

// @route POST api/auth/
// @desc Login POST email userUID
// @access Public
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("userUID", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors });
    }
    const { email, userUID } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: { msg: "User not found" } });
      }
      const isMatch = user.userUID === userUID;
      if (!isMatch) {
        return res.status(401).json({
          error: { msg: "Please contact support : UserUID not matched" },
        });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route POST api/auth/
// @desc Login POST name email userUID
// @access Public
router.post(
  "/google",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check("userUID", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, skills, userUID } = req.body;
    try {
      let user = await User.findOne({ userUID });

      //if user exist return with jwt token
      if (user) {
        const isMatch = user.userUID === userUID;
        if (!isMatch) {
          return res.status(401).json({
            error: { msg: "Please contact support : UserUID not matched" },
          });
        }
        const payload = {
          user: {
            id: user.id,
            name: user.name,
          },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }

      //create account and then return token
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        userUID,
        avatar,
        skills,
      });
      await user.save();
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
