const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, dob } = req.body;

    if (!email || !dob) {
      return res.status(400).json({ message: "Email and DOB required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or DOB" });
    }

    const normalizedDob = String(dob).trim().padStart(8, "0");
    const isMatch = await bcrypt.compare(normalizedDob, user.dob);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or DOB" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
