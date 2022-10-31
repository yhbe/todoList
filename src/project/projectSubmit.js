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
    list.forEach((project) => {
      const p = document.createElement("p");
      p.classList.add(project.id);
      p.classList.add("single-Project");
      p.innerHTML = project.name;
      createProjectIcons(p);
    });
    console.log(list);

    form.reset();
  });
}

function createProjectIcons(p) {
  const createProjectsDiv = document.querySelector(".created-Projects");
  const img = document.createElement("img");
  img.src = circle;
  p.appendChild(img);
  createProjectsDiv.append(p);
}
