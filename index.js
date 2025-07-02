const projects = document.getElementById("projects");
const contacts = document.getElementById("contacts");
const parent = document.getElementById("parent");

projects.addEventListener("click", displayProjects);
// contacts.addEventListener("click", showContacts);

//function to display one project
function showsmallCard(project) {
  const child = document.createElement("div");
  child.innerHTML = `<div class="child"> 
    <img src="${project.image}" alt ="${project.title}"></img>
    <h1>${project.title}</h1>
    <p>${project.brief}</p>
    </div>
    `;

  parent.append(child);
  smallCard = document.getElementById("smallCard");
  child.addEventListener("click", () => {
    showBigCard(project);
  });
}

//funtion to open the project when clicked
function showBigCard(project) {
  (async (project) => {
    const res = await fetch(`http://localhost:3003/projects/${project.id}`);
    const data = await res.json();
    console.log(data);

    //creating one card and appending it to the parent div in the body
    const child = document.createElement("div");
    child.innerHTML = `<div> 
    <img src="${data.image}" alt ="${data.title}"></img>
    <h1>${data.title}</h1>
    <p>${data.description}</p>
    <a href=${data.github} ></a>
    <p>View it deployed at :<a href="${data.deployed}" target="_blank">deployed page</a><p>
    </div>
    `;
    parent.innerHTML = "";
    parent.append(child);
  })(project);
}
//function to fetch and display all projects
function displayProjects() {
  parent.innerHTML = "";
  (async () => {
    const res = await fetch("http://localhost:3003/projects");
    const projects = await res.json();
    projects.forEach((project) => {
      showsmallCard(project);
    });
  })();
}
