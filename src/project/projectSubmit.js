import circle from "../images/minus-Circle.png";
let list = [];

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
  });
}

function createProjectIcons(p) {
  const createProjectsDiv = document.querySelector(".created-Projects");
  const img = document.createElement("img");
  img.classList.add("remove-Project");
  img.src = circle;
  p.appendChild(img);
  createProjectsDiv.append(p);
  trashEventListener();
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
    });
  });
}
