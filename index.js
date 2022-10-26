const form = document.querySelector(".login-form");
const emailInput = document.querySelector('[name="email"]');
const usernameInput = document.querySelector('[name="name"]');
const passwordInput = document.querySelector('[name="password"]');
const submitBtn = document.querySelector(".submit-button");

form.addEventListener("submit", registerUser);
[emailInput, usernameInput, passwordInput].forEach((el) =>
  el.addEventListener("keyup", changeBtnState)
);

function registerUser(event) {
  event.preventDefault();

  fetch("https://63559402483f5d2df3b717aa.mockapi.io/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: getUser(),
  })
    .then((response) => response.json())
    .then((user) => {
      alert(JSON.stringify(user));
    })
    .then(() => {
      form.reset();
    })
    .catch((err) => {
      console.error(`The error ${err} occured during registering a new user`);
    });
}

function getUser() {
  const user = Object.fromEntries(new FormData(form));
  user.createdAt = new Date();

  return JSON.stringify(user);
}

function changeBtnState(event) {
  if (form.checkValidity()) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
