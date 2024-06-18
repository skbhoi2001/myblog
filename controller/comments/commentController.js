const createCommentController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const updateCommentController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const getCommentController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
  } catch (error) {
    return next(appErr(`${error.message}`, 400));
  }
};

module.exports = {
  createCommentController,
  updateCommentController,
  getCommentController,
  deleteCommentController,
};
