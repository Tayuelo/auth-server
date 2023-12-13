const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/home", (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
