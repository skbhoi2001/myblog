const express = require("express");
const multer = require("multer");
const storage = require("../../config/cloudnary");
const isLogin = require("../../middleware/loginStatus");
const {
  createDetailController,
  updateDetailController,
  deleteDetailController,
} = require("../../controller/details/detailController");

const detailRoutes = express.Router();
//! instances of multers
const upload = multer({
  storage,
});

detailRoutes.post(
  "/:id",
  isLogin,
  upload.single("file"),
  createDetailController
);
detailRoutes.get("/");
detailRoutes.get("/:id", isLogin);
detailRoutes.put("/:id", isLogin, updateDetailController);
detailRoutes.delete("/:id", isLogin, deleteDetailController);

module.exports = detailRoutes;
