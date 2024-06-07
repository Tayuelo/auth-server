const { request, response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

    req.session.user = { id: user.uid, username: user.username };
    res.status(200).send({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Login failed.",
    });
  }
};

const logoutUser = async (req, res) => {
  if (req.session) {
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Could not log out, please try again " });
      } else {
        res.send({ message: "Logout successful" });
      }
    });
  } else {
    res.status(400).send({ message: "You are not logged in" });
  }
};

const getUsers = async (req = request, res = response) => {
  const users = await User.find();

  res.json({ users });
};

const registerUser = async (req, res = response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ msg: "Email already registered." });

  const userModel = new User({ email, password });

  const hashedPass = await bcrypt.hash(password, 10);
  userModel.password = hashedPass;

  await userModel.save();

  res.json({
    userModel,
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
};
