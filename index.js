const projects = document.getElementById("projects");
const parent = document.getElementById("parent");

projects.addEventListener("click", displayProjects);
contacts.addEventListener("click", showContacts);

//function to display one project
function showsmallCard(project) {
  const child = document.createElement("div");

  child.className = `
    bg-gray-900 text-gray-200   overflow-hidden 
    transform hover:scale-105 transition-transform duration-200 cursor-pointer
    flex flex-col
  `;

  child.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-t-2xl">
    <div class="p-4 space-y-2">
      <h1 class="text-xl font-semibold text-gray-500">${project.title}</h1>
      <p class="text-sm text-zinc-300">${project.brief}</p>
    </div>
  `;

  parent.append(child);

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

  parent.className =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4";

  (async () => {
    const res = await fetch("http://localhost:3003/projects");
    const projects = await res.json();
    projects.forEach((project) => {
      showsmallCard(project);
    });
  })();
}
