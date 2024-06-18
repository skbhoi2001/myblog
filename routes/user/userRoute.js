const express = require("express");
const {
  registerController,
  loginController,
  getUserByIdController,
  updateLoginController,
} = require("../../controller/user/userController");

const userRoutes = express.Router();

//! register
userRoutes.post("/register", registerController);

//! login
userRoutes.post("/login", loginController);

//! get user
userRoutes.get("/", getUserByIdController);

//! update user
userRoutes.put("/", updateLoginController);

//!delete user
userRoutes.delete("/", updateLoginController);

module.exports = userRoutes;
