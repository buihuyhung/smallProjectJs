const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

const getRandomUser = async function () {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

const doubleMoney = function () {
  data = data.map((item) => {
    return {
      ...item,
      money: item.money * 2,
    };
  });
  updateDom();
};

const sortByRichest = function () {
  data.sort((a, b) => b.money - a.money);
  updateDom();
};

const showMillionaires = function () {
  data = data.filter((cur) => cur.money > 1000000);
  updateDom();
};

const calculateWealth = function () {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${new Intl.NumberFormat(
    "vn-VN",
    { style: "currency", currency: "EUR" }
  ).format(wealth)}`;
  main.appendChild(wealthEl);
};

const addData = function (obj) {
  data.push(obj);

  updateDom();
};

const updateDom = function (providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  const markup = providedData
    .map(
      (item) => `
      <div class="person"> <strong>${
        item.name
      }</strong> ${new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "EUR",
      }).format(item.money)}</div>
  `
    )
    .join("");
  main.insertAdjacentHTML("beforeend", markup);
};

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
