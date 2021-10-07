const express = require("express");
const connectDB = require("./config/db");
const app = express();

// connect Database
connectDB();

app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
