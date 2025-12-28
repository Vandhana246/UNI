const xlsx = require("xlsx");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const wb = xlsx.readFile("users.xlsx");
  const sheet = xlsx.utils.sheet_to_json(
    wb.Sheets[wb.SheetNames[0]],
    { raw: true }
  );

  for (const u of sheet) {
    const email = u.email.toLowerCase().trim();

    const exists = await User.findOne({ email });
    if (exists) {
      console.log(`⏭️ Skipped (exists): ${email}`);
      continue;
    }

    await User.create({
      username: u.username,
      email,
      bio: u.bio || "",
      dob: await bcrypt.hash(String(u.dob), 10),
      avatar: "",
    });

    console.log(`✅ Added: ${email}`);
  }

  console.log("🎉 Excel sync complete");
  process.exit();
})();
