const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const Workout = require("../models/workouts");

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({});

  try {
    res.send(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getWorkoutsBySearch = async (req, res) => {
  const { searchQuery, level } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await Workout.find({
      $or: [{ name: title }, { level: level }],
    });
    res.send(posts);
  } catch (error) {
    console.log(error);
  }
};

const createWorkout = async (req, res) => {
  const userID = req.user.id;
  const user = User.findById(userID);
  const workout = new Workout({
    name: req.body.name,
    exercises: req.body.exercises,
    desc: req.body.desc,
    level: req.body.level,
    tags: req.body.tags,
    likes: req.body.likes,
    user: userID,
    username: req.body.username,
  });
  workout
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(workout);
      return user;
    })
    .then((user) => {
      user.createdPosts.push(workout);
      return user.save();
    })
    .catch((err) => res.status(500).json(err));
};

const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    res.send(workout);
  } catch (error) {
    res.status(500).send(error);
  }
};
const likeWorkout = async (req, res) => {
  console.log(req.user._id);
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout.likes.includes(req.user._id)) {
      await workout.updateOne({ $push: { likes: req.user._id } });
      res.status(200).json("The post has been liked");
    } else {
      await workout.updateOne({ $pull: { likes: req.user._id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllUserWorkouts = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { user: id };
    const allWorkouts = await Workout.find(query);
    res.send(allWorkouts);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.send("Workout deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateWorkout = async (req, res) => {
  const { id: _id } = req.params;
  const workout = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("There is no workout with that id");

  const updatedWorkout = await Workout.findByIdAndUpdate(_id, workout, {
    new: true,
  });
  res.send(updatedWorkout);
};
module.exports = {
  getWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  getAllUserWorkouts,
  likeWorkout,
  getWorkoutsBySearch,
};
