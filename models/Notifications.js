const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const PostInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
});

const NotificationSchema = new mongoose.Schema({
  sender: {
    type: UserInfoSchema,
    required: true,
  },
  receiver: {
    type: UserInfoSchema,
    required: true,
  },
  post: {
    type: PostInfoSchema,
    required: true,
  },
  type: {
    type: String,
    enum: ["LIKE", "COMMENT"],
    default: "LIKE",
  },
  meta: {
    body: String,
  },
  content: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Notification = mongoose.model(
  "notifications",
  NotificationSchema
);
