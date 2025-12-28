require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/profile", require("./routes/profile.routes"));


// test route
app.get("/", (req, res) => {
  res.send("API RUNNING");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

