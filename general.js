const readline = require("readline");
const fs = require("fs");

var ansDict = {
  name: "Nobot",
  desc:
    "I am a node robot. I am here to help you with your queries related to OS, File System. I can also provide you the data from the web or try to solve your general questions.",
  okay: "Okay"
};
function answer(qst) {
  try {
    var key = getKey(qst);
    if (key == "question" || key == "help") {
      if (key == "help") {
        console.log(`Enter commands in following format:
  
        OS commands
        os : free memory | total memory
        
        File System commands
        fs : all files | list
  
        For general questions
        <tyep_anything>
        
        `);
      } else {
        checkAndAnswerQuestion(qst);
      }
    } else {
      if (key in ansDict) console.log(ansDict[key]);
      else checkAndAnswerQuestion(qst);
    }
  } catch {
    console.log("Unable to understand the questions. Check the format");
  }
}

function getKey(qst) {
  var q = qst.toLowerCase();

  var type = getQstType(q);
  if (type == 2) {
    return "okay";
  }

  if (type == 1) return "question";

  if (q.indexOf("name") != -1) return "name";

  if (q.indexOf("help") != -1) return "help";

  if (
    q.indexOf("work") != -1 ||
    q.indexOf("describe") != -1 ||
    q.indexOf("desc") != -1
  )
    return "desc";
}

function getQstType(str) {
  var len = str.length;
  if (str[len - 1] == "?") return 1;
  else if (str[len - 1] == "!" || str[len - 1] == ".") return 2;
}

function checkAndAnswerQuestion(qs) {
  let rl = readline.createInterface({
    input: fs.createReadStream("./question-answers.txt")
  });

  let line_no = 0;
  let sendResp = false;

  // event is emitted after each line
  rl.on("line", function(line) {
    if (sendResp) {
      console.log(line);
      rl.close();
    }
    line_no++;
    sendResp = checkAndResponse(qs.toLowerCase(), line.toLowerCase());
  });

  rl.on("close", function(line) {
    if (!sendResp)
      console.log("I don't know this. Can you tell me it's meaning");
  });
}

function checkAndResponse(qs, line) {
  if (qs == line) return true;
  let firstArray = qs.split(" ");
  let lineArray = line.split(" ");

  let resultObj = {};
  firstArray.forEach(element => {
    if (element in resultObj) {
    } else {
      resultObj[element] = 1;
    }
  });

  lineArray.forEach(element => {
    if (element in resultObj) {
      resultObj[element] = 2;
    } else {
      resultObj[element] = 1;
    }
  });

  var count = 0;

  for (var key in resultObj) {
    if (resultObj[key] >= 2) count++;
  }
  if (count > 1) return true;
  else {
    if (count == 1 && firstArray.length < 3) return true;
  }
  return false;
}

module.exports.answer = answer;
