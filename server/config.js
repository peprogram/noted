const path = require("path");

module.exports = {
  development: {
    sitename: "Noted [Dev]",
    data: {
      notes: path.join(__dirname, "/notes.json"),
    },
  },
  production: {
    sitename: "Noted!",
    data: {
      notes: path.join(__dirname, "/notes.json"),
    },
  },
};
