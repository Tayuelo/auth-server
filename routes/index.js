const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { loginUser, registerUser, token } = require("../controllers/auth");

/* GET users listing. */
router.get("/", (req, res) => {
  res.send("Hi");
});

router.get("/home", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post(
  "/login",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
  ],
  loginUser
);

router.post(
  "/register",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
    check("username", "Password is mandatory").not().isEmpty(),
  ],
  registerUser
);

router.get("/token", token);

module.exports = router;
