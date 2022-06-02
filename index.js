const express = require("express");
const mongoose = require("mongoose");
const password = "adminadmin";
const dbname = "StrongCoders";
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user/routes");
const workoutRoutes = require("./routes/workouts/routes");
const multer = require("multer");
const path = require("path");
const User = require("./models/user");
app.use(express.json({ limit: "50mb" }));
const host = "0.0.0.0";
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/workout", workoutRoutes);
app.use("/images", express.static(path.join(__dirname, "public/images")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(
  `mongodb+srv://admin:${password}@cluster0.k4nui.mongodb.net/${dbname}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to database");
});
