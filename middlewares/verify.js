const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req = request, res = response, next) => {
  const token = req.cookies.rt;

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const { uid } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Authentication failed.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      msg: "Authentication failed: 0"
    });
  }
};

module.exports = {
    verifyToken
}