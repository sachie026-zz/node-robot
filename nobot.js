var stdin = process.openStdin();
console.log(`Hey, Its Nobot! how may I help you?
Ask questions in the following format to get the desired result:

`);

var selectedModule = null;

stdin.addListener("data", function(d) {
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
