const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`server started on port ${PORT}`));
