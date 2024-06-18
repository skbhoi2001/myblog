require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user/userRoute");
const profileRoutes = require("./routes/profile/profileRoute");
const postRoutes = require("./routes/post/postRoute");
const detailRoutes = require("./routes/details/detailRoute");

const app = express();
app.use(cors());

app.use(
  cors({
    origin: "*", // Allow requests from any origin
  })
);

//!middleware
app.use(express.json());

//! ROUTES
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/detail", detailRoutes);

//! Error

app.get("/", (req, res) => {
  res.json({ message: "Hello Welcome" });
});

app.get("/test", (req, res) => {
  res.json("Chal to raha hai");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Live on port ${process.env.PORT} `);
});
