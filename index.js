const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const password = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user/routes");
const workoutRoutes = require("./routes/workouts/routes");
app.use(express.json({ limit: "50mb" }));
const host = "0.0.0.0";
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/workout", workoutRoutes);

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
