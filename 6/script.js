const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

open.addEventListener("click", () => modal.classList.add("show-modal"));

close.addEventListener("click", () => modal.classList.remove("show-modal"));

window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

const arrTest = [[3], 4, [2], [5], 1, 6];
console.log(arrTest.sort((a, b) => a - b));
