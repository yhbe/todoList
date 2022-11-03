import trash from "../images/trash.png";
import edit from "../images/edit.png";

let list = [];

class CreateTodo {
  constructor(title, due, prio) {
    this.name = title;
    this.due = due;
    this.prio = prio;
    this.id = Math.random();
  }
}

export function todoSubmit() {
  const form = document.querySelector(".todo-Form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#task").value;
    const due = document.querySelector("#date").value;
    const prio = document.querySelector("#priority").value;

    list.push(new CreateTodo(title, due, prio));
    clear();
    domManipulation();
    form.reset();
    console.log(list);
  });
}

function domManipulation() {
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
      console.log(list);
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
          displayModal();
          title.value = item.name;
          due.value = item.due;
          prio.value = item.prio;
        }
      });
    });
  });
}

function displayModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
}

function clear() {
  const todoContent = document.querySelector(".content");
  todoContent.innerHTML = "";
}
