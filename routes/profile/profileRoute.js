const express = require("express");
const multer = require("multer");
const {
  getProfileController,
  deleteProfileController,
  createProfileController,
  updateProfileController,
} = require("../../controller/profile/profileController");
const isLogin = require("../../middleware/loginStatus");
const storage = require("../../config/cloudnary");

const profileRoutes = express.Router();

//! instances of multers
const upload = multer({
  storage,
});

//!create
profileRoutes.post(
  "/",
  isLogin,
  upload.single("file"),
  createProfileController
);

//!get
profileRoutes.get("/", isLogin, getProfileController);

//!update
profileRoutes.put("/", isLogin, updateProfileController);

//!delete
profileRoutes.delete("/", deleteProfileController);

module.exports = profileRoutes;
