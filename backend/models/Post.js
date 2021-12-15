const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // photo,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  tags: {
    // to be changed
    type: [],
    required: true,
  },
  likes: {
    type:Object
  },
  dislikes: {
    type:Object
  },
  likesCounter:{
    type:Number,
    default:0
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  images:{
    type:[],
  }
});
module.exports = Post = mongoose.model("post", PostSchema);
