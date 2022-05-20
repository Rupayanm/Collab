const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

router.get("/privatefeed", auth, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.next = {
    page: page + 1,
    limit: limit,
  };

  results.previous = {
    page: page - 1,
    limit: limit,
  };

  try {
    let user = await User.findById(req.user.id);
    user.skills = user.skills.map((v) => v.toLowerCase());
    results.feed = await Post.find({ tags: { $in: user.skills } })
      .hint("tags_1")
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json(err.message);
    console.error(err.message);
  }
});

router.get("/publicfeed", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.next = {
    page: page + 1,
    limit: limit,
  };

  results.previous = {
    page: page - 1,
    limit: limit,
  };

  try {
    results.feed = await Post.find()
      .hint("date_-1")
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
module.exports = router;
