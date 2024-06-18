const Detail = require("../../model/details/details");
const Post = require("../../model/post/Post");
const User = require("../../model/user/User");
const { appErr } = require("../../utils/appErr");
const successResponse = require("../../utils/success");

const createDetailController = async (req, res, next) => {
  const userId = req.user;
  const postId = req.params.id;
  let image = req.file ? req.file.path : "";

  const { title, description, code } = req.body;

  try {
    const userFound = await User.findById(userId);
    if (!userFound) {
      return next(appErr("User Not Found"));
    }
    const postFound = await Post.findById(postId);
    if (!postFound) {
      return next(appErr("Post Not found"));
    }
    if (postFound.user.toString() !== userId.toString()) {
      return next(appErr("Not access to alter the post"));
    }
    if (!title || !description) {
      return next(appErr("Enter Required Details"));
    }

    const createDetail = await Detail.create({
      post: postId,
      user: userId,
      title,
      description,
      code,
      image: image,
    });
    postFound.details.push(createDetail._id);
    await postFound.save();
    successResponse({
      res,
      message: "Details Created",
      data: createDetail,
    });
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const updateDetailController = async (req, res, next) => {
  const userId = req.user;
  
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const getDetailController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const deleteDetailController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

module.exports = {
  createDetailController,
  updateDetailController,
  getDetailController,
  deleteDetailController,
};
