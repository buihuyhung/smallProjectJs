"use strict";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");

let ticketPrice = +movie.value;

const setMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

const updateSelectedCount = function () {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
};

const populateUI = function () {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (!selectedSeats) return;
  seats.forEach((seat, i) => {
    if (selectedSeats.indexOf(i) > -1) seat.classList.add("selected");
  });

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  movie.selectedIndex = selectedMovieIndex;
};

populateUI();
movie.addEventListener("change", function (e) {
  ticketPrice = +e.target.value;
  updateSelectedCount();

  setMovieData(e.target.selectedIndex, e.target.value);
});

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

updateSelectedCount();
