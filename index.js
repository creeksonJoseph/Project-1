const projects = document.getElementById("projects");
const parent = document.getElementById("parent");
const mainContent = document.getElementById("mainContent");
const staticContent = document.getElementById("staticContent");
const url = `http://localhost:3003/projects`;

projects.addEventListener("click", displayProjects);

function showsmallCard(project) {
  const child = document.createElement("div");
  child.className = `
    bg-gray-900 text-gray-200 overflow-hidden rounded-2xl
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
  child.addEventListener("click", () => {
    showBigCard(project);
  });
  return child;
}

function showBigCard(project) {
  (async () => {
    const res = await fetch(`${url}/${project.id}`);
    const data = await res.json();
    console.log(data);

    const child = document.createElement("div");
    child.innerHTML = `
      <div class="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-500 to-white text-black relative">
        <button 
          class="absolute top-6 left-6 px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-800 transition"
          id="backToProjects"
        >
          ⬅️ Back
        </button>
        <img 
          src="${data.image}" 
          alt="${data.title}" 
          class="w-full max-w-3xl object-cover rounded-lg mb-6"
        />
        <h1 class="text-3xl font-bold text-gray-900 text-center">${data.title}</h1>
        <p class="text-gray-800 max-w-2xl  mt-4">${data.description}</p>
        <div class="flex flex-wrap gap-4 mt-6">
          <a 
            href="${data.github}" 
            target="_blank" 
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <i class="fa-brands fa-github"></i> GitHub
          </a>
          <a 
            href="${data.deployed}" 
            target="_blank" 
            class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
          >
            Live Demo
          </a>
        </div>
      </div>
    `;

    mainContent.innerHTML = "";
    mainContent.className = `
      bg-gradient-to-b 
      from-gray-500 
      to-white
    `;
    mainContent.appendChild(child);

    document
      .getElementById("backToProjects")
      .addEventListener("click", displayProjects);
  })();
}

function displayProjects() {
  staticContent.style.display = "none";
  mainContent.innerHTML = "";
  mainContent.className = `
    min-h-screen 
    bg-gradient-to-b 
    from-gray-500 
    to-white
    p-6 
    space-y-6
  `;

  const controls = document.createElement("div");
  controls.className = "flex justify-between items-center gap-4 flex-wrap";

  const backBtn = document.createElement("button");
  backBtn.textContent = "⬅️ Back";
  backBtn.className =
    "px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600";
  backBtn.addEventListener("click", restoreProfileLayout);

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search projects...";
  searchInput.className =
    "flex-1 px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-600";

  controls.append(backBtn, searchInput);
  mainContent.append(controls);

  const title = document.createElement("h2");
  title.textContent = "Here are my projects so far";
  title.className = "text-2xl font-bold text-center text-gray-900";
  mainContent.append(title);

  const hr = document.createElement("hr");
  hr.className = "border-t-2 border-gray-300 w-1/2 mt-0 mx-auto mb-5";
  mainContent.append(hr);

  const projectGrid = document.createElement("div");
  projectGrid.className = `
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-6
  `;
  mainContent.append(projectGrid);

  (async () => {
    const res = await fetch(`${url}`);
    const projects = await res.json();
    projects.forEach((project) => {
      const card = showsmallCard(project);
      projectGrid.append(card);
    });
  })();
}

function restoreProfileLayout() {
  mainContent.className = `transition-opacity duration-500 opacity-100`;
  mainContent.innerHTML = "";
  staticContent.style.display = "block";

  document
    .getElementById("projects")
    .addEventListener("click", displayProjects);
}
