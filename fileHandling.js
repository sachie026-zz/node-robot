var fs = require("fs");

function answer(qst) {
  var key = getKey(qst);
  switch (key) {
    case "all-files":
      getAllFiles();
      break;
    default:
      console.log("Sorry, I cannot help your with this question");
      break;
  }
}

function getKey(qst) {
  var q = qst.split(":", 2)[1].toLowerCase();
  if (q.indexOf("files") != -1 || q.indexOf("list") != -1) return "all-files";
}

function getAllFiles() {
  var fl = fs.readdir("./", function(err, res) {
    if (res) console.log(res);
    else console.log("Unable to read");
  });
  console.log(fl);
}

module.exports.answer = answer;
