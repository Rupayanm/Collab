const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const Post = require("./models/Post");
const User = require("./models/User");
const config = require("config");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
// connect Database
connectDB();

const conn = mongoose.connection;

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use(cors());

// users  -> signup
app.use("/api/users", require("./routes/api/users"));

// auth -> jwt login
app.use("/api/auth", require("./routes/api/auth"));

// profile -> everything profile related
app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/posts", require("./routes/api/posts"));

app.use("/api/search", require("./routes/api/search"));

app.use("/api/feed", require("./routes/api/feed"));

app.use("/api/upload", require("./routes/api/upload"));

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
