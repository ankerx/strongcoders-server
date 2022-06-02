const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    exercises: [{ exerciseName: String, sets: Number, reps: Number }],
    desc: String,
    level: String,
    tags: [String],
    likes: [],
    username: String,
  },
  { timestamps: true },
  { collection: "workouts" }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
