const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const authOpt = require("../../middleware/authOpt");
const util = require("util");
require("dotenv").config();

router.get("/privatefeed", auth, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let results = {};
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
    let feedData = await Post.find({ tags: { $in: user.skills } })
      .sort({ date: "desc" })
      .limit(limit)
      .skip(startIndex)
      .lean()
      .exec();
    const feed = [];
    for (let post in feedData) {
      const author = await User.findById(feedData[post].postedBy)
        .select("name email avatar")
        .lean();
      if (feedData[post].likes && req.user.id in feedData[post].likes) {
        feed.push({ ...author, ...feedData[post], status: "LIKED" });
      } else if (
        feedData[post].dislikes &&
        req.user.id in feedData[post].dislikes
      ) {
        feed.push({
          ...author,
          ...feedData[post],
          status: "DISLIKED",
        });
      } else {
        feed.push({ ...author, ...feedData[post], status: "NULL" });
      }
    }
    results.feed = feed;
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json(err.message);
    console.error(err.message);
  }
});

router.get("/publicfeed", authOpt, async (req, res) => {
  console.log(req.body, "Feed Request");
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  let user = req.user ? await User.findById(req.user.id) : null;
  console.log(user, "Public feed user");

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const feed = [];
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
    const feedData = await Post.find()
      .sort({ date: "desc" })
      .limit(limit)
      .skip(startIndex)
      .lean()
      .exec();
    console.log(feedData, "feedData");
    for (let post in feedData) {
      const author = await User.findById(feedData[post].postedBy)
        .select("name email avatar")
        .lean();
      if (user) {
        if (feedData[post].likes && req.user.id in feedData[post].likes) {
          feed.push({ ...author, ...feedData[post], status: "LIKED" });
        } else if (
          feedData[post].dislikes &&
          req.user.id in feedData[post].dislikes
        ) {
          feed.push({
            ...author,
            ...feedData[post],
            status: "DISLIKED",
          });
        } else {
          feed.push({ ...author, ...feedData[post], status: "NULL" });
        }
      } else {
        feed.push({ ...author, ...feedData[post] });
      }
    }
    results.feed = feed;
    console.log("Results", results);
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
module.exports = router;
