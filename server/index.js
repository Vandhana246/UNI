require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// routes
app.use("/auth", require("./routes/auth.routes"));

// test route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("API RUNNING");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
