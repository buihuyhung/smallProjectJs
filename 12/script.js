const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "rank",
  "tense",
  "airplane",
  "hacker",
  "pies",
  "juice",
  "warlike",
  "react",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "database",
  "loving",
];

let randomWord;

let score = 0;
let time = 10;

let difficulty = localStorage.getItem("diffculty")
  ? localStorage.getItem("diffculty")
  : "medium";

difficultySelect.value = localStorage.getItem("diffculty")
  ? localStorage.getItem("diffculty")
  : "medium";
text.focus();

const gameOver = function () {
  endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
   `;

  endgameEl.style.display = "flex";
};

const updateTime = function () {
  time--;
  timeEl.textContent = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

const timeInterval = setInterval(updateTime, 1000);

const updateScore = function () {
  score++;
  scoreEl.textContent = score;
};

const getRandomWord = function () {
  return words[Math.floor(Math.random() * words.length)];
};

const addWordToDom = function () {
  randomWord = getRandomWord();
  word.textContent = randomWord;
};

addWordToDom();

text.addEventListener("input", function (e) {
  let insertedWord = e.target.value;

  if (insertedWord === randomWord) {
    addWordToDom();
    updateScore();

    e.target.value = "";

    if (difficulty === "easy") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }
    updateTime();
  }
});

settingsBtn.addEventListener("click", function () {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("diffculty", difficulty);
});
