const projects = document.getElementById("projects");
const contacts = document.getElementById("contacts");

projects.addEventListener("click", displayProjects);
contacts.addEventListener("click", showContacts);

//function to display one project
function showsmallCard(project) {
  document.body.innerHTML = `<div id="smallCard"> 
    <img src="${project.image}" alt ="${project.title}"></img>
    <h1>${project.title}</h1>
    <p>${project.brief}</p>
    </div>
    `;
}
showsmallCard.addEventListener("click", showBigCard);

//funtion to open the project when clicked
function showBigCard(project) {
  (async (project) => {
    const res = await fetch(`http://localhost:3003/projects/${project.id}`);
    const data = await res.json();
    console.log(data);
  })(project);
  document.body.innerHTML = `<div> 
    <img src="${project.image}" alt ="${project.title}"></img>
    <h1>${project.title}</h1>
    <p>${project.description}</p>
    <a href=${project.github} ></a>
    <p>View it deployed at :${project.deployed}
    </div>
    `;
}
//function to fetch and display all projects
function displayProjects() {
  (async () => {
    const res = await fetch("http://localhost:3003/projects");
    const projects = await res.json();
    projects.forEach((project) => {
      showsmallCard(project);
    });
  })();
}
