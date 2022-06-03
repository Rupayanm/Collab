const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
require("dotenv").config();

const jwtSecret = process.env.jwtSecret;

// @route POST api/users
// @desc signup
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check("userUID", "userUID is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, skills, userUID } = req.body;
    try {
      let user = await User.findOne({ userUID });

      if (user) {
        return res
          .status(200)
          .json({ errors: [{ msg: "Hmm ,User already exists" }] });
      }
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

// @route GET api/users/notifications
// @access Public
router.get("/notifications", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let notifications = await Notification.find({
      "receiver._id": mongoose.Types.ObjectId(req.user.id),
    }).sort({ createdAt: "desc" });
    res.status(200).json(notifications);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route PUT api/users/notifications/read/:id
// @access Private
router.put("/notifications/read/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let notifications = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { isRead: true },
      {
        new: true,
      }
    );
    res.status(200).json(notifications);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
