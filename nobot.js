var stdin = process.openStdin();
console.log(`Hey, Its Nobot! how may I help you?
Ask questions in the following format to get the desired result:

<type> : <questions> 
os : tell me about free memory
`);

let dict = {
  name: "Nobot"
};

var selectedModule = null;
stdin.addListener("data", function(d) {
  // note:  d is an object, and when converted to a string it will
  // end with a linefeed.  so we (rather crudely) account for that
  // with toString() and then trim()

  var moduleName = getQuestionKey(d.toString().trim());
  try {
    selectedModule = require("./" + moduleName);
    selectedModule.answer(d.toString().trim());
  } catch {
    console.log("Unable to understand the questions. Check the format");
  }
  console.log("");
});

function getQuestionKey(keys) {
  var keysLowerCase = keys.toLowerCase();
  if (
    keysLowerCase.indexOf("operating") != -1 ||
    keysLowerCase.indexOf("os") != -1
  ) {
    return "osHandling";
  }

  if (
    keysLowerCase.indexOf("file") != -1 ||
    keysLowerCase.indexOf("fs") != -1
  ) {
    return "fileHandling";
  }

  if (
    keysLowerCase.indexOf("server") != -1 ||
    keysLowerCase.indexOf("http") != -1
  ) {
    return "httpHandling";
  }

  return "general";
}

function checkQuestion(str) {
  return dict[getQuestionKey(str)];
}
