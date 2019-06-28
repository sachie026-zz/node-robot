const os = require("os");

function answer(qst) {
  var key = getKey(qst);
  switch (key) {
    case "frmem":
      getFreeMemory();
      break;
    case "totmem":
      getTotalMemory();
      break;
    case "pf":
      getPlatform();
      break;
    case "cwd":
      getCwd();
      break;
    default:
      console.log("Sorry, I cannot help your with this question");
      break;
  }
}

function getKey(qst) {
  var q = qst.split(":", 2)[1].toLowerCase();
  if (q.indexOf("free") != -1 || q.indexOf("available") != -1) return "frmem";

  if (q.indexOf("total") != -1) return "totmem";

  if (
    q.indexOf("platform") != -1 ||
    q.indexOf("operating") != -1 ||
    q.indexOf("os") != -1
  )
    return "pf";

  if (q.indexOf("current") != -1 || q.indexOf("root") != -1) return "cwd";
}

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

function getPlatform() {
  console.log(os.platform());
}

function getTotalMemory() {
  console.log(bytesToSize(os.totalmem()));
}

function getFreeMemory() {
  console.log(bytesToSize(os.freemem()));
}

function getCwd() {
  var root = os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
  console.log(root);
}

module.exports.answer = answer;
