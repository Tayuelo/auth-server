const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const isAuthenticated = require("../middlewares/auth.middleware");

router.get("/is-authenticated", isAuthenticated, (req, res) => {
  const user = req.session.user;
  res.status(200).send({ message: "Authenticated.", user });
});

router.post("/logout", AuthController.logoutUser);

router.post("/sign-up", AuthController.registerUser);

router.post("/sign-in", AuthController.loginUser);

module.exports = router;
