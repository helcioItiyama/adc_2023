module.exports = (fileName) => {
  var fs = require("fs");
  var text = fs.readFileSync(`./inputs/${fileName}.txt`);
  var textByLine = text.toString().split("\n");
  return textByLine;
}