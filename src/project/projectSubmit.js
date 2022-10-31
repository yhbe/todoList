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
    const createProjectsDiv = document.querySelector(".created-Projects");

    list.push(new CreateProject(inp));
    list.forEach((project) => {
      const p = document.createElement("p");
      p.classList.add(project.id);
      p.innerHTML = project.name;
      createProjectsDiv.append(p);
    });
    console.log(list);

    form.reset();
  });
}

function createProjectIcons() {}
