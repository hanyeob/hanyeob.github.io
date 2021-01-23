const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(username,before=0) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  form.style.display='none';
  let word='';
  if(before){
      word = 'Welcome back!';
  }else {
      word = 'Hello!';
  }
  greeting.innerText = `${word} ${username}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser,1);
  }
}

function init() {
  loadName();
}

init();