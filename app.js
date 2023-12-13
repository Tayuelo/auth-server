require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use("/media", express.static("public"));

app.get("/", function(req, res) {
    res.send("Hello world");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(port);
console.log(`Express started on port ${port}`);