const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { loginUser, registerUser, logoutUser, getUsers } = require("../controllers/auth");
const isAuthenticated = require("../middlewares/is-authenticated");

/* GET users listing. */
router.get("/users", isAuthenticated, getUsers);

router.get("/home", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post(
  "/sign-in",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
  ],
  loginUser
);

router.post(
  "/sign-up",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
  ],
  registerUser
);

router.post(
  "/logout",
  logoutUser
);

router.get("/is-authenticated", isAuthenticated, (req, res) => {
  res.status(200).send({ message: "Authenticated." })
});

module.exports = router;
