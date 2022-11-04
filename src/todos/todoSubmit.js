import trash from "../images/trash.png";
import edit from "../images/edit.png";
import { activeProject_ } from "../project/projectSubmit";
import { storageAvailable } from "..";

let list = [];

let setTodoItem = () => localStorage.setItem("todoItem", JSON.stringify(list));

let getTodoItem = () => JSON.parse(localStorage.getItem("todoItem"));

class CreateTodo {
  constructor(title, due, prio) {
    this.name = title;
    this.due = due;
    this.prio = prio;
    this.id = Math.random();
    this.category = activeProject_;
  }
}

export function todoSubmit() {
  const form = document.querySelector(".todo-Form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#task").value;
    const due = document.querySelector("#date").value;
    const prio = document.querySelector("#priority").value;

    list.push(new CreateTodo(title, due, prio, activeProject_));
    setTodoItem();
    clearTodoContent();
    domManipulation();
    form.reset();
  });
}

export function domManipulation() {
  const container = document.querySelector(".content");

  list.forEach((todo) => {
    if (todo.category === activeProject_) {
      let input = document.createElement("input");
      input.type = "checkbox";

      const div = document.createElement("div");
      div.classList.add(todo.id);
      div.classList.add("single-Todo");

      const title = document.createElement("p");
      title.classList.add("single-Todo-Title");
      title.innerHTML = todo.name;

      const due = document.createElement("p");
      due.classList.add("date");
      due.innerHTML = todo.due;

      const prio = document.createElement("p");
      prio.innerHTML = todo.prio;

      div.append(input, title, due, prio);
      container.append(div);
      createTodoIcons(div);
    }
  });
}

export function domManipulationShowAll() {
  const container = document.querySelector(".content");
  list.forEach((todo) => {
    let input = document.createElement("input");
    input.type = "checkbox";

    const div = document.createElement("div");
    div.classList.add(todo.id);
    div.classList.add("single-Todo");

    const title = document.createElement("p");
    title.classList.add("single-Todo-Title");
    title.innerHTML = todo.name;

    const due = document.createElement("p");
    due.classList.add("date");
    due.innerHTML = todo.due;

    const prio = document.createElement("p");
    prio.innerHTML = todo.prio;

    div.append(input, title, due, prio);
    container.append(div);
    createTodoIcons(div);
  });
}

function createTodoIcons(div) {
  const trashimg = document.createElement("img");
  trashimg.classList.add("trash-Image");
  trashimg.src = trash;

  const editimg = document.createElement("img");
  editimg.classList.add("edit-Image");
  editimg.src = edit;

  div.append(trashimg, editimg);
  trashEventListener();
  editEventListener();
}

function trashEventListener() {
  const trashImages = document.querySelectorAll(".trash-Image");

  trashImages.forEach((image) => {
    image.addEventListener("click", (e) => {
      const deletedProjectId = parseFloat(e.target.parentNode.classList[0]);

      e.target.parentNode.remove();

      let filteredList = [];

      list.filter((item) => {
        if (item.id !== deletedProjectId) {
          filteredList.push(item);
        }
      });

      list = filteredList;
      setTodoItem();
    });
  });
}

function editEventListener() {
  const editImage = document.querySelectorAll(".edit-Image");

  editImage.forEach((image) => {
    image.addEventListener("click", function () {
      let id = this.parentNode.classList[0];

      let title = document.querySelector("#task");
      const due = document.querySelector("#date");
      const prio = document.querySelector("#priority");

      list.filter((item) => {
        if (item.id === parseFloat(id)) {
          displayModal(item);
        }
      });
    });
  });
}

function displayModal(item) {
  const modal = document.querySelector(".modal");

  const input = document.querySelector("#modal-Task");
  const due = document.querySelector("#modal-Date");
  const prio = document.querySelector("#modal-Priority");

  input.value = item.name;
  due.value = item.due;
  prio.value = item.prio;

  modal.addEventListener("submit", (e) => {
    e.preventDefault();

    item.name = input.value;
    item.due = due.value;
    item.prio = prio.value;

    modal.style.display = "none";
    clearTodoContent();
    domManipulation();
  });
  modal.style.display = "block";
}

export function clearTodoContent() {
  const todoContent = document.querySelector(".content");
  todoContent.innerHTML = "";
}

if (storageAvailable("localStorage")) {
  if (getTodoItem() == null) {
    list = "";
  } else {
    list = getTodoItem();
    domManipulationShowAll();
  }
}

storageAvailable();
