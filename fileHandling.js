var fs = require("fs");

function answer(qst) {
  var key = getKey(qst);
  switch (key) {
    case "all-files":
      getAllFiles();
      break;
    case "read":
      readFile();
      break;
    default:
      console.log("Sorry, I cannot help your with this question");
      break;
  }
}

function getKey(qst) {
  var q = qst.split(":", 2)[1].toLowerCase();
  if (q.indexOf("files") != -1 || q.indexOf("list") != -1) return "all-files";
  return "read";
}

function getAllFiles() {
  var fl = fs.readdir("./", function(err, res) {
    if (res) console.log(res);
    else console.log("Unable to read");
  });
  console.log(fl);
}

function readFile() {
  const readline = require("readline");
  // const fs = require('fs');

  // create instance of readline
  // each instance is associated with single input stream
  let rl = readline.createInterface({
    input: fs.createReadStream("./logger.js")
  });

  let line_no = 0;

  // event is emitted after each line
  rl.on("line", function(line) {
    line_no++;
    console.log(line);
  });

  // end
  rl.on("close", function(line) {
    console.log("Total lines : " + line_no);
  });
}

module.exports.answer = answer;
module.exports.readFile = readFile;
