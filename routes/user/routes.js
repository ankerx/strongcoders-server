const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  uploadImg,
  login,
} = require("../../controllers/users");
const auth = require("../../middlewear/auth");
const router = express.Router();

router.post("/uploadImg/:id", uploadImg);
router.get("/all", getUsers);
router.get("/me", auth, getUser);
router.post("/sign-up", createUser);
router.post("/log-in", login);
router.delete("/:id", auth, deleteUser);
router.patch("/:id", auth, updateUser);
module.exports = router;
