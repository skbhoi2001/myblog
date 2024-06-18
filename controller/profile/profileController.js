const Profile = require("../../model/profile/Profile");
const User = require("../../model/user/User");
const { appErr } = require("../../utils/appErr");
const successResponse = require("../../utils/success");

const createProfileController = async (req, res, next) => {
  let userId = req.user;
  let image = req.file ? req.file.path : "";

  const { name, about, qualification } = req.body;

  try {
    if (!userId) {
      return next(appErr("Please login again"));
    }
    const userFound = await User.findById(userId);
    if (!userFound) {
      return next(appErr("User not found, Please login again"));
    }

    const profileCreate = await Profile.create({
      email: userFound.email,
      user: userId,
      image: image,
      name,
      about,
      qualification,
    });
    userFound.profile.push(profileCreate._id);
    userFound.profileCreated = true;
    await userFound.save();
    successResponse({
      res,
      message: "Profile Created",
      data: profileCreate,
    });
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const getProfileController = async (req, res, next) => {
  let userId = req.user;
  try {
    if (!userId) {
      return next(appErr("Please login again"));
    }
    const userFound = await User.findById(userId);
    if (!userFound) {
      return next(appErr("User not found, Please login again"));
    }

    const getAllProfile = await Profile.find({});
    const profile = getAllProfile.filter(
      (ele) => ele.user.toString() === userId.toString()
    );

    successResponse({
      res,
      message: "My Profile",
      data: profile[0],
    });
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const updateProfileController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const deleteProfileController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

module.exports = {
  createProfileController,
  getProfileController,
  updateProfileController,
  deleteProfileController,
};
