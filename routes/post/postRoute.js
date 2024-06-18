const express = require("express");
const multer = require("multer");
const isLogin = require("../../middleware/loginStatus");
const storage = require("../../config/cloudnary");
const {
  createPostController,
  getPostController,
  getAllPostController,
  getPostByidController,
  updatePostController,
} = require("../../controller/post/postController");

const postRoutes = express.Router();
//! instances of multers
const upload = multer({
  storage,
});

postRoutes.post("/", isLogin, upload.single("file"), createPostController);
postRoutes.get("/all", getAllPostController);
postRoutes.get("/:id", getPostByidController);
postRoutes.get("/", getPostController);
postRoutes.put("/:id", isLogin, updatePostController);

module.exports = postRoutes;
