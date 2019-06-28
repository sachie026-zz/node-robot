const http = require("http");

function answer(qst) {
  var key = getKey(qst);
  switch (key) {
    case "create":
      createServ();
      break;
    case "close":
      stopServer();
      break;
    default:
      console.log("Sorry, I cannot help your with this question");
      break;
  }
}

function getKey(qst) {
  var q = qst.split(":", 2)[1].toLowerCase();
  if (q.indexOf("create") != -1 || q.indexOf("new") != -1) return "create";
  if (
    q.indexOf("close") != -1 ||
    q.indexOf("stop") != -1 ||
    q.indexOf("exit") != -1
  )
    return "close";
}

function createServ() {
  const server = http
    .createServer(function(req, res) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      console.log("Server create successfully. Running on 8080");
      res.write("Hello world!");
      res.end();
    })
    .listen(8080);
}
function stopServer() {
  server.close();
}

module.exports.createServ = createServ;
module.exports.stopServer = stopServer;
module.exports.answer = answer;
