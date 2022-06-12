const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  const users = await userModel.find({}).populate("createdPosts");
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        })
        .catch((err) => res.status(500).json(err));
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({ user, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, "SECRET_KEY", { expiresIn: "15d" });
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("createdPosts");
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("There is no user with that id");

  const updatedUser = await userModel.findByIdAndUpdate(_id, user, {
    new: true,
  });
  res.send(updatedUser);
};
module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  login,
};
