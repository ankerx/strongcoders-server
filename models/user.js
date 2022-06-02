const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    createdPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
        required: true,
      },
    ],
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
