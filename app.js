const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todo.routes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//Models
const models = require("./models");

//Sync Database
models.sequelize
  .sync()
  .then(() => {
    console.log("Nice! Database looks fine");
  })
  .catch((err) => {
    console.log(err, "Something went wrong with the Database Update!");
  });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/todos", todosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
