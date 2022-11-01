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
  trashimg.src = trash;

  const editimg = document.createElement("img");
  editimg.src = edit;

  div.append(trashimg, editimg);
}
