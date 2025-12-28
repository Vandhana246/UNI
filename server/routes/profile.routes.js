const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* GET profile */
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-dob");
  res.json(user);
});

/* UPDATE profile (username, bio, avatar) */
router.put("/me", auth, async (req, res) => {
  const { username, bio, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { username, bio, avatar },
    { new: true }
  ).select("-dob");

  res.json(user);
});

module.exports = router;
