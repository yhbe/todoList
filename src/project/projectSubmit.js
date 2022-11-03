import { storageAvailable } from "..";
import circle from "../images/minus-Circle.png";
let list = [];

let setTodo = () => localStorage.setItem("todo", JSON.stringify(list));
let getTodo = () => JSON.parse(localStorage.getItem("todo"));

function clear() {
  const createProjectsDiv = document.querySelector(".created-Projects");
  createProjectsDiv.innerHTML = "";
}

function CreateProject(project) {
  this.name = project;
  this.id = Math.random();
}

export function projectSubmit() {
  const form = document.querySelector(".projects-Form");
  //createdProjects

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clear();

    const inp = document.querySelector("#project").value;

    list.push(new CreateProject(inp));
    setTodo();
    loadProjectDom();
    console.log(list);

    form.reset();
  });
}
function loadProjectDom() {
  list.forEach((project) => {
    const p = document.createElement("p");
    p.classList.add(project.id);
    p.classList.add("single-Project");
    p.innerHTML = project.name;
    createProjectIcons(p);
    trashEventListener();
    setCurrentProject();
  });
}

function createProjectIcons(p) {
  const createProjectsDiv = document.querySelector(".created-Projects");
  const img = document.createElement("img");
  img.classList.add("remove-Project");
  img.src = circle;
  p.appendChild(img);
  createProjectsDiv.append(p);
}

function setCurrentProject() {
  const singleProjectsDiv = document.querySelectorAll(".single-Project");
  let activeProject = document.querySelector(".active-Project");
  console.log(activeProject);

  singleProjectsDiv.forEach((div) => {
    div.addEventListener("click", function (e) {
      removeActives();
      e.target.classList.add("active-Project");
    });
  });

  function removeActives() {
    singleProjectsDiv.forEach((div) => div.classList.remove("active-Project"));
  }
}

function trashEventListener() {
  const trashImages = document.querySelectorAll(".remove-Project");

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
      setTodo();
    });
  });
}

if (storageAvailable("localStorage")) {
  list = getTodo();
  loadProjectDom();
}

storageAvailable();
