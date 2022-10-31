export function projectSubmit() {
  const form = document.querySelector(".projects-Form");
  //createdProjects

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inp = document.querySelector("#project").value;
    const createProjectsDiv = document.querySelector(".created-Projects");
    const p = document.createElement("p");

    p.innerHTML = inp;
    createProjectsDiv.appendChild(p);

    form.reset();
  });
}
