const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectID");
const Notifications = require("../../models/Notifications");
const router = express.Router();
require("dotenv").config();

router.post(
  "/createPost",
  auth,
  check("title", "title is required").notEmpty(),
  check("description", " description is required").notEmpty(),
  check("tags", "no tags provided").isArray(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let postFields = {
      name: req.user.name,
      postedBy: req.user.id,
      title: req.body.title,
      description: req.body.description,
      members: req.body.members,
      tags: req.body.tags,
      readTime: req.body.readTime,
    };

    try {
      let post = new Post({
        ...postFields,
      });
      await post.save();
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            posts: post.id,
          },
        },
        { new: true, setDefaultsOnInsert: true }
      );
      return res.status(200).json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server-Error");
    }
  }
);

router.post(
  "/editPost/:id",
  auth,
  checkObjectId("id"),
  check("title", "title is required").notEmpty(),
  check("description", " description is required").notEmpty(),
  check("tags", "no tags provided").isArray(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const post = await Post.findById(req.params.id).lean();
    if (post?.postedBy.toString() !== req.user.id) {
      return res.status(403).send("User is not author of Post");
    }
    let postFields = {
      name: req.user.name,
      postedBy: req.user.id,
      title: req.body.title,
      description: req.body.description,
      members: req.body.members,
      tags: req.body.tags,
      readTime: req.body.readTime,
    };

    try {
      const postResponse = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: postFields },
        { new: true, setDefaultsOnInsert: true }
      );
      return res.status(200).json(postResponse);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server-Error");
    }
  }
);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", checkObjectId("id"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const author = await User.findById(post.postedBy)
      .select("name email avatar")
      .lean();
    res.json({ ...post, author });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const authorviews = await User.findByIdAndUpdate(
      post.postedBy,
      {
        $inc: { views: -post.views },
        $pull: {
          posts: post.id,
        },
      },
      { new: true }
    ).select("views");

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/view/:id
// @desc     Like a post
// @access   Public
router.put("/view/:id", checkObjectId("id"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const user = await User.findById(post.postedBy);

    const views = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    ).select("views");

    const authorviews = await User.findByIdAndUpdate(
      post.postedBy,
      {
        $inc: { views: 1 },
      },
      { new: true }
    ).select("views");

    return res.status(200).json(views);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const dislikeKey = "dislikes." + req.user.id;
    const likeKey = "likes." + req.user.id;
    const post = await Post.findOne({ _id: req.params.id }).select(
      "-likes -dislikes"
    );
    const isLiked = await Post.findOne({
      _id: req.params.id,
      [likeKey]: { $exists: true },
    });

    let likes = {};
    if (isLiked === null) {
      const ifDisliked = await Post.findOne({
        _id: req.params.id,
        [dislikeKey]: { $exists: true },
      });
      if (ifDisliked === null) {
        likes = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: { [likeKey]: 1 },
            $unset: { [dislikeKey]: "" },
            $inc: { likesCounter: 1 },
          },
          { new: true }
        ).select("likesCounter");
      } else {
        likes = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: { [likeKey]: 1 },
            $unset: { [dislikeKey]: "" },
            $inc: { likesCounter: 2 },
          },
          { new: true }
        ).select("likesCounter");
      }
    } else {
      likes = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $unset: { [dislikeKey]: "", [likeKey]: "" },
          $inc: { likesCounter: -1 },
        },
        { new: true }
      ).select("likesCounter");
    }

    if (req.user.id !== post.postedBy) {
      const postAuthor = await User.findById(post.postedBy);
      const prevNotification = await Notifications.findOne({
        "sender._id": req.user.id,
        type: "LIKE",
        "post._id": post.id,
      });
      if (prevNotification === null) {
        const notificationFields = {
          sender: {
            name: req.user.name,
            _id: req.user.id,
          },
          receiver: {
            name: postAuthor.name,
            _id: postAuthor.id,
          },
          post: {
            title: post.title,
            _id: post.id,
          },
          type: "LIKE",
          content: "liked your post!",
        };

        let notification = new Notifications({
          ...notificationFields,
        });

        await notification.save();
      }
    }

    return res.status(200).json(likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const dislikeKey = "dislikes." + req.user.id;
    const likeKey = "likes." + req.user.id;
    const post = await Post.findOne({
      _id: req.params.id,
      [dislikeKey]: { $exists: true },
    });
    // Check if the post has not yet been disliked
    if (post === null) {
      const ifLiked = await Post.findOne({
        _id: req.params.id,
        [likeKey]: { $exists: true },
      });
      if (ifLiked === null) {
        const dislikes = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: { [dislikeKey]: 1 },
            $unset: { [likeKey]: "" },
            $inc: { likesCounter: -1 },
          },
          { new: true }
        ).select("likesCounter");
        return res.status(200).json(dislikes);
      } else {
        const dislikes = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: { [dislikeKey]: 1 },
            $unset: { [likeKey]: "" },
            $inc: { likesCounter: -2 },
          },
          { new: true }
        ).select("likesCounter");
        return res.status(200).json(dislikes);
      }
    } else {
      const dislikes = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $unset: { [likeKey]: "", [dislikeKey]: "" },
          $inc: { likesCounter: +1 },
        },
        { new: true }
      ).select("likesCounter");
      return res.status(200).json(dislikes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  auth,
  checkObjectId("id"),
  // check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);

      await post.save();

      if (req.user.id !== post.postedBy) {
        const postAuthor = await User.findById(post.postedBy);

        const notificationFields = {
          sender: {
            name: req.user.name,
            _id: req.user.id,
          },
          receiver: {
            name: postAuthor.name,
            _id: postAuthor.id,
          },
          post: {
            title: post.title,
            _id: post.id,
          },
          meta: {
            body: req.body.text,
          },
          type: "COMMENT",
          content: "commented on your post!",
        };

        let notification = new Notifications({
          ...notificationFields,
        });

        await notification.save();
      }

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.delete("/deleteNotification/:id", auth, async (req, res) => {
  try {
    const notification = await User.findOneAndUpdate(
      req.user.id,
      { $unset: { [`notifications.${req.params.id}`]: 1 } },
      { new: true }
    );
    return res.status(200).json(notification);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
