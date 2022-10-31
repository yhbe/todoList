export function projectSubmit() {
  const projectButton = document.querySelector(".project-Button");
  //createdProjects
  projectButton.addEventListener("click", () => {
    const inp = document.querySelector("#project").value;
    const createProjectsDiv = document.querySelector(".createdProjects");
    const p = document.createElement("p");

    p.innerHTML = inp;
    createProjectsDiv.appendChild(p);
  });
}
