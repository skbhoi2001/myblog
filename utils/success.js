const successResponse = ({ res, message, data }) => {
  res.json({
    message,
    data,
  });
};

module.exports = successResponse;
