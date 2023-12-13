const { request, response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { toJWT } = require("../helpers/jwt");
const { verifyToken } = require("../middlewares/verify");

const getUsers = async (req = request, res = response) => {
  const users = await User.find();

  res.json({ users });
};

const registerUser = async (req, res = response) => {
  const { email, password, username } = req.body;
  const user = new User({ username, email, password });

  const hashedPass = await bcrypt.hash(password, 10);
  user.password = hashedPass;

  // Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "Email not registered.",
      });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({
        msg: "Invalid data.",
      });
    }

    const at = await toJWT(user.id, process.env.ACCESS_TOKEN_SECRET, "5m");
    const rt = await toJWT(user.id, process.env.REFRESH_TOKEN_SECRET, "10m");

    res.cookie("at", at, {
      httpOnly: true,
    });
    res.cookie("rt", rt, {
      httpOnly: true,
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Login failed.",
    });
  }
};

const token = async (req = request, res = response) => {
  const inRT = req.cookies.rt;
  if (!inRT) return res.status(400).send("Missing authorization.");

  try {
    const { uid } = verifyToken(inRT, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(uid);
    if (!user)
      return res.status(401).json({
        msg: "Authentication failed: 1",
      });

    const at = await toJWT(user.id, process.env.ACCESS_TOKEN_SECRET, "5m");
    const rt = await toJWT(user.id, process.env.REFRESH_TOKEN_SECRET, "10m");

    res.cookie("at", at, {
      httpOnly: true,
    });
    res.cookie("rt", rt, {
      httpOnly: true,
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    token
}