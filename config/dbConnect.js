const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    mongoose.set("strictQuery", false);
    console.log("DB connected");
  } catch (error) {
    console.log(error.message);
  }
};

dbConnect();
