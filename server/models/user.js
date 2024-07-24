const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
