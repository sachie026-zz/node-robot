var ansDict = {
  name: "Nobot",
  desc:
    "I am a node robot. I am here to help you with your queries related to OS, File System. I can also provide you the data from the web or try to solve your general questions."
};
function answer(qst) {
  try {
    console.log(ansDict[getKey(qst)]);
  } catch {
    console.log("Unable to understand the questions. Check the format");
  }
}

function getKey(qst) {
  var q = qst.toLowerCase();
  if (q.indexOf("name") != -1) return "name";

  if (
    q.indexOf("work") != -1 ||
    q.indexOf("describe") != -1 ||
    q.indexOf("desc") != -1
  )
    return "desc";
}

module.exports.answer = answer;
