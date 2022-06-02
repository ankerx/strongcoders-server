const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_KEY");
    // console.log(decoded);
    // req.user = await User.findById(decoded.userId);
    // req.userId = decoded?.id;
    req.user = await User.findById(decoded.id).select("-password");
    // console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};
