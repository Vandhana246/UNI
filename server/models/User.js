const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  dob: String, // hashed
  username: String,
  bio: { type: String, default: "" },

  avatar: {
    type: String, // image URL or base64
    default: "",  // empty = use default avatar
  },
});

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
