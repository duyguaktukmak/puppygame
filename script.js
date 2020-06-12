// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const UNCHECKED_IMAGE_URL = "images/unchecked.png";
const CHECKED_IMAGE_URL = "images/checked.png";
var takenAnswers = new Map();
var takenAnswersWithQuestions = [];

const checkBoxes = document.querySelectorAll(".checkbox");
for (const box of checkBoxes) {
  box.addEventListener("click", changeToChosen);
}

function restartQuiz() {
  takenAnswers = new Map();
  takenAnswersWithQuestions = [];
}

function getFinalResult(keyValue) {
  var result = RESULTS_MAP[keyValue];

  const div = document.createElement("div");
  div.className = "results";

  const h2 = document.createElement("h2");
  var h2_text = document.createTextNode(result.title);
  h2.appendChild(h2_text);

  var p = document.createElement("P");
  var t = document.createTextNode("You got: " + result.contents);
  p.appendChild(t);

  var button = document.createElement("BUTTON");
  var button_text = document.createTextNode("Restart quiz");
  button.className = "custom_button";
  button.onclick = restartQuiz();
  button.appendChild(button_text);

  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(button);

  document.getElementById("article").appendChild(div);

  const checkBoxes = document.querySelectorAll(".checkbox");
  for (const box of checkBoxes) {
    box.removeEventListener("click", changeToChosen);
  }
}

function takeResults() {
  if (
    (takenAnswersWithQuestions[0][1] === takenAnswersWithQuestions[1][1]) ===
    takenAnswersWithQuestions[2][1]
  ) {
    return getFinalResult(takenAnswersWithQuestions[0][1]);
  }
  for (let [k, v] of takenAnswers) {
    if (v === 2) {
      return getFinalResult(k);
    }
  }
  let result = takenAnswersWithQuestions.filter((a) => a.questionId === "one");
  return getFinalResult(result[0].choiceId);
}

function changeToChosen(event) {
  let questionId = event.target.parentElement.dataset.questionId;
  let choiceId = event.target.parentElement.dataset.choiceId;
  if (takenAnswers.has(choiceId)) {
    takenAnswers.set(choiceId, takenAnswers.get(choiceId) + 1);
  } else {
    takenAnswers.set(choiceId, 1);
  }
  takenAnswersWithQuestions.push({ questionId, choiceId });

  event.target.src = CHECKED_IMAGE_URL;
  event.target.parentElement.parentElement.parentElement.className = "choice-grid chosen_container";
  event.target.parentElement.style.backgroundColor = "#cfe3ff";
  event.target.parentElement.style.opacity = 1;

  if (takenAnswersWithQuestions.length === 3) {
    takeResults();
  }
}
