const projects = document.getElementById("projects");
const contacts = document.getElementById("contacts");

projects.addEventListener("click", showcards);
contacts.addEventListener("click", showContacts);

//function to display one card
function showsmallCard(project) {
  document.body.innerHTML = `<div id="smallCard"> 
    <img src="${project.image}" alt ="${project.title}"></img>
    <h1>${project.title}</h1>
    <p>${project.brief}</p>
    </div>
    `;
}
showsmallCard.addEventListener("click", showBigCard);

//funtion to open the card when clicked
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
