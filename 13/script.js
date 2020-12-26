const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

const message = new SpeechSynthesisUtterance();

const setTextMessage = function (text) {
  message.text = text;
};

const speakText = function () {
  speechSynthesis.speak(message);
};

const createBox = function (item) {
  const { text, image } = item;
  const markup = `
       <div class="box">
          <img src="${image}" alt="${text}"/>
          <p class="info">${text}</p>
       </div>
   `;
  main.insertAdjacentHTML("afterbegin", markup);
};

data.forEach(createBox);

main.addEventListener("click", function (e) {
  const box = e.target.closest(".box");

  if (!box) return;

  setTextMessage(box.querySelector("p").textContent);
  speakText();

  box.classList.add("active");
  setTimeout(() => box.classList.remove("active"), 800);
});

let voices = [];

const getVoices = function () {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
};

const setVoice = function (e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
};

speechSynthesis.addEventListener("voiceschanged", getVoices);

toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", function () {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();

fetch("https://jsonplaceholder.typicode.com/comments")
  .then((res) => res.json())
  .then((data) => console.log(data));
