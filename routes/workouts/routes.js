const express = require("express");
const auth = require("../../middlewear/auth");
const {
  getWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  getAllUserWorkouts,
  likeWorkout,
  getWorkoutsBySearch,
} = require("../../controllers/workouts");
const router = express.Router();

router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.get("/workouts/search", getWorkoutsBySearch);
router.post("/create-workout", auth, createWorkout);
router.delete("/:id", auth, deleteWorkout);
router.put("/:id", auth, updateWorkout);
router.get("/user/:id", getAllUserWorkouts);
router.put("/:id/like", auth, likeWorkout);
module.exports = router;
