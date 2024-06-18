const bcrypt = require("bcryptjs");
const User = require("../../model/user/User");
const { AppErr, appErr } = require("../../utils/appErr");
const successResponse = require("../../utils/success");
const generateToken = require("../../utils/generateatoken");

const registerController = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (!email || !password) {
      return next(new AppErr("Enter all details", 400));
    }

    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User Already Exists", 400));
    }

    //! hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //!create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    res.json({
      message: "User Register",
      data: user,
    });
    // successResponse({
    //   res,
    //   message: "User Register",
    //   data: user,
    // });
  } catch (error) {
    return next(error.message);
  }
};

const loginController = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (!email || !password) {
      return next(new AppErr("Enter all details", 400));
    }

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new AppErr("Invalid Crediential", 400));
    }

    const passwordCheck = await bcrypt.compare(password, userFound.password);

    if (!passwordCheck) {
      return next(new AppErr("Invalid Crediential", 400));
    }
    delete userFound["password"];
    let resData = {
      user: userFound,
      token: generateToken(userFound._id),
    };
    successResponse({
      res,
      message: "User Login",
      data: resData,
    });
  } catch (error) {
    return next(error.message);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const updateLoginController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const deleteController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

module.exports = {
  registerController,
  loginController,
  getUserByIdController,
  updateLoginController,
  deleteController,
};
