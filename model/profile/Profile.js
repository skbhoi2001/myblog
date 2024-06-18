const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  about: {
    type: String,
    require: true,
  },
  qualification: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
