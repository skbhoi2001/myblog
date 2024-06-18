const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  heading: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  keyword: [
    {
      type: String,
      require: true,
    },
  ],
  type: {
    type: String,
    require: true,
  },
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Detail",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
