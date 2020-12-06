const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const calculate = function () {
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/7b6041a0f4247e9d44cc7da3/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rates[currencyTwo];

      rateEl.textContent = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
};

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", function () {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});
