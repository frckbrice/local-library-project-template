var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const pug = require("pug");
//* require mongoose
const mongoose = require("mongoose");
require("dotenv").config();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
// app.use("/catalog", require("./routes/catalog")); // Add catalog routes to middleware chain.
app.use("/catalog/genres", require("./routes/genre"));
app.use("/catalog/books", require("./routes/book"));
app.use("/catalog/authors", require("./routes/author"));
app.use("/catalog/bookinstances", require("./routes/bookinstance"));
//*MONGOOSE apply connection

mongoose.set("strictQuery", false);

(async () => {
  await mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected successfully to database");
    })
    .catch((err) => {
      console.log("Failed to connect to database", err);
    });
})();

//* catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
