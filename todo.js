const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
  doneList = document.querySelector(".js-doneList");
  List = document.querySelector(".js-List");

const TODOS_LS = "toDos",
DONES_LS = "dones";

let toDos = [],
dones = [];

function hideList(){
    if(toDos.length+dones.length === 0){
    List.classList.add('hidden');
    }
}

function doneToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return parseInt(toDo.id) !== parseInt(li.id);
  });
  paintDone(li.querySelector("span").innerText);
  toDos = cleanToDos;
  saveToDos();saveDones();
}

function backToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  doneList.removeChild(li);
  const cleanDones = dones.filter(function(done) {
    return parseInt(done.id) !== parseInt(li.id);
  });
  paintToDo(li.querySelector("span").innerText);
  dones = cleanDones;
  saveToDos();saveDones();
}

function deleteDone(event) {
  const btn = event.target;
  const li = btn.parentNode;
  doneList.removeChild(li);
  const cleanDones = dones.filter(function(toDo) {
    return parseInt(toDo.id) !== parseInt(li.id);
  });
  dones = cleanDones;
  saveDones();
  hideList();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return parseInt(toDo.id) !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
  hideList();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveDones() {
    localStorage.setItem(DONES_LS, JSON.stringify(dones));
}

function paintDone(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = Math.random()*100000000;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteDone);
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", backToDo);
  span.innerText = text;
  span.classList.add('list-text')
  span.style.textDecorationLine = "line-through";
  li.appendChild(span);
  li.appendChild(backBtn);
  li.appendChild(delBtn);
  li.id = newId;
  doneList.appendChild(li);
  const doneoObj = {
    text: text,
    id: newId
  };
  dones.push(doneoObj);
  saveToDos();
}

function paintToDo(text) {
    List.classList.remove('hidden');
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = Math.random()*100000000;
  delBtn.innerText = "❌";
  doneBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.addEventListener("click", doneToDo);
  span.innerText = text;
  span.classList.add('list-text')
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
  const loadedDones = localStorage.getItem(DONES_LS);
  if (loadedDones !== null) {
    const parsedToDos = JSON.parse(loadedDones);
    parsedToDos.forEach(function(toDo) {
      paintDone(toDo.text);
    });
  }
  if ( ((loadedDones === null) && (loadedToDos === null)) ||
  ((loadedDones === '[]') && (loadedToDos === '[]'))
  ){
    List.classList.add('hidden');
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();