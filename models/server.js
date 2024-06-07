const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const logger = require("morgan");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MongoStore = require("connect-mongo");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = "/";
    this.connectDatabase();
    this.registerMiddlewares();
    this.registerRoutes();
    this.registerErrorHandlers();
  }

  async connectDatabase() {
    await dbConnection();
  }

  registerMiddlewares() {
    this.app.set("views", "views");
    this.app.set("view engine", "pug");
    this.app.use(cors({
      origin: 'http://localhost:4200',
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(logger("dev"));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: process.env.SUPER_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI,
          maxAge: 1000 * 60 * 60 * 24
        }),
        cookie: { secure: "auto", httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
      })
    )
  }

  registerRoutes() {
    this.app.use(this.path, require("../routes/index"));
  }

  registerErrorHandlers() {
    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    this.app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

module.exports = Server;