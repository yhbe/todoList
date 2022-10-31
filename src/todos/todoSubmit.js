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
  list.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("singe-Todo");

    const title = document.createElement("p");
    title.innerHTML = todo.name;

    const due = document.createElement("p");
    due.innerHTML = todo.due;

    const prio = document.createElement("p");
    prio.innerHTML = todo.prio;

    div.append(title, due, prio);
    createTodoIcons(div);
  });
}

function createTodoIcons(div) {
  const createTodosDiv = document.querySelector(".content");
  const img = document.createElement("img");
  // img.classList.add("remove-Project");
  // img.src = circle;
  // p.appendChild(img);
  createTodosDiv.append(div);
  // trashEventListener();
}
