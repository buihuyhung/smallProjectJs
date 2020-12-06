const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const showError = function (input, message) {
  const formControl = input.parentElement;
  formControl.classList.remove("success");
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.textContent = message;
};

const showSuccess = function (input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
};

const checkEmail = function (input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

const getFieldName = function (input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
};

const checkRequired = function (...inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = function (input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkPassword = function (input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired(username, email, password, password2);
  checkLength(username, 3, 15);
  checkLength(password, 8, 25);
  checkEmail(email);
  checkPassword(password, password2);
});
