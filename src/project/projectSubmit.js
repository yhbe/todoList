import { storageAvailable } from "..";
import circle from "../images/minus-Circle.png";
import {
  clearTodoContent,
  domManipulation,
  domManipulationShowAll,
  projectWasDeleted,
} from "../todos/todoSubmit";
let list = [];
export let activeProject_ = "";

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clear();

    const inp = document.querySelector("#project").value;

    list.push(new CreateProject(inp));
    setTodo();
    loadProjectDom();

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

  singleProjectsDiv.forEach((div) => {
    div.addEventListener("click", function (e) {
      removeActives();
      e.target.classList.add("active-Project");
      activeProject_ = e.target.classList[0];
      if (activeProject_ === "remove-Project") {
        return;
      }
      clearTodoContent();
      domManipulation();
      doubleClickProject();
    });
  });
  function removeActives() {
    singleProjectsDiv.forEach((div) => div.classList.remove("active-Project"));
  }
}

function doubleClickProject() {
  let activeProject = document.querySelector(".active-Project");

  if (activeProject == null) {
    ("");
  } else {
    activeProject.addEventListener("click", function () {
      this.classList.remove("active-Project");
      activeProject_ = "";

      clearTodoContent();
      domManipulationShowAll();
      setCurrentProject();
    });
  }
}

function trashEventListener() {
  const trashImages = document.querySelectorAll(".remove-Project");

  trashImages.forEach((image) => {
    image.addEventListener("click", (e) => {
      const deletedProjectId = parseFloat(e.target.parentNode.classList[0]);

      let filteredList = [];

      list.filter((item) => {
        if (item.id !== deletedProjectId) {
          filteredList.push(item);
        }
      });

      list = filteredList;
      clear();
      loadProjectDom();
      setTodo();
      domManipulationShowAll();
    });
  });
}

if (storageAvailable("localStorage")) {
  if (getTodo() === null) {
    list == "";
  } else list = getTodo();

  loadProjectDom();
}

storageAvailable();
