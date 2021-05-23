const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const configs = require("./config");

const NotesService = require("./NotesService");

const noted = express();

const config = configs[noted.get("env")];
const noteService = new NotesService(config.data.notes);

noted.set("view engine", "pug");

if (noted.get("env") === "development") {
  noted.locals.pretty = true;
}

noted.set("views", path.join(__dirname, "/views"));
noted.locals.title = config.sitename;

const route = require("./route");
const { get } = require("http");

noted.use(express.static("public"));
noted.use(bodyParser.urlencoded({ extended: true }));

noted.use(
  "/",
  route({
    noteService,
  })
);

noted.use((req, res, next) => {
  return next(createError(404, "File Not Found"));
});

noted.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  return res.render("error");
});

noted.listen(3000);
module.export = noted;
