const mongoose = require("mongoose");
const config = require("config");
let db = "";

if (process.env.NODE_ENV === "production") {
  db = process.env.MONGODB_URI;
} else {
  db = config.get("mongoURI");
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
