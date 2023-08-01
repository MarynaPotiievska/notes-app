const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    filename: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
};
