const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummlyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions = localStorageTransactions ? localStorageTransactions : [];

const generateID = function () {
  return Math.floor(Math.random() * 10000);
};

const addTransactionDOM = function (transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const markup = `
      <li class=${transaction.amount < 0 ? "minus" : "plus"}> ${
    transaction.text
  } <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button> </li>
   `;

  list.insertAdjacentHTML("afterbegin", markup);
};

const updateValues = function () {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, cur) => acc + cur, 0);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, cur) => acc + cur, 0) * -1
  ).toFixed(2);

  balance.textContent = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "USD",
  }).format(total);

  money_plus.textContent = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "USD",
  }).format(income);
  money_minus.textContent = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "USD",
  }).format(expense);
};

const addTransaction = function (e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Text and amount is required");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = amount.value = "";
  }
};
const init = function () {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
};

const removeTransaction = function (id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};

const updateLocalStorage = function () {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

init();
form.addEventListener("submit", addTransaction);
console.log(form);
