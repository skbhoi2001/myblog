const Post = require("../../model/post/Post");
const Profile = require("../../model/profile/Profile");
const User = require("../../model/user/User");
const { appErr } = require("../../utils/appErr");
const successResponse = require("../../utils/success");

const createPostController = async (req, res, next) => {
  let userId = req.user;
  let image = req.file ? req.file.path : "";
  const { heading, description, keyword, type } = req.body;
  try {
    const userFound = await User.findById(userId);
    if (!userFound) {
      return next(appErr("User not found, Please login again"));
    }
    const profileId = userFound.profile[0];
    const profileFound = await Profile.findById(profileId);
    if (!profileFound) {
      return next(appErr("Something went wrong, Please login again"));
    }
    if (!heading || !description || !keyword || !type) {
      return next(appErr("Please enter all details"));
    }

    const createPost = await Post.create({
      user: userId,
      heading,
      description,
      keyword,
      type,
      image,
    });
    profileFound.posts.push(createPost._id);
    await profileFound.save();
    successResponse({
      res,
      message: "Post Created",
      data: createPost,
    });
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const getAllPostController = async (req, res, next) => {
  try {
    const getAllPosts = await Post.find({});
    successResponse({
      res,
      message: "All Posts",
      data: getAllPosts,
    });
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};
const getPostByidController = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const getPost = await Post.findById(postId).populate("details");
    if (!getPost) {
      return next(appErr("Invalid Post"));
    }
    successResponse({
      res,
      message: "Post Details",
      data: getPost,
    });
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const updatePostController = async (req, res, next) => {
  const { heading, description, keyword, type } = req.body;
  const userid = req.user;
  try {
    const postId = req.params.id;
    const getPost = await Post.findById(postId);
    if (!getPost) {
      return next(appErr("Invalid Post"));
    }
    if (userid.toString() !== getPost.user.toString()) {
      return next(appErr("Not Access to Update"));
    }

    const updatePost = await Post.findByIdAndUpdate(
      postId,
      {
        heading,
        description,
        keyword,
        type,
      },
      {
        new: true,
      }
    );
    successResponse({
      res,
      message: "Post Updated",
      data: updatePost,
    });
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const getPostController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const deletePostController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

module.exports = {
  createPostController,
  updatePostController,
  getPostController,
  deletePostController,
  getAllPostController,
  getPostByidController,
};
