const projects = document.getElementById("projects");
const parent = document.getElementById("parent");
const mainContent = document.getElementById("mainContent");
const staticContent = document.getElementById("staticContent");
const url = `https://portfolio-server-sa2t.onrender.com/projects`;

//warming up the server
window.addEventListener("DOMContentLoaded", () => {
  fetch(`${url}`);
});
//warming up the bookshelf server
window.addEventListener("DOMContentLoaded", () => {
  fetch(`https://json-server-yp7e.onrender.com`);
});

projects.addEventListener("click", displayProjects);
//show one card with the projects summary
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
      <button class="view-btn  self-end  text-sm bg-cyan-50 text-gray-900 rounded-3xl px-4 py-1 hover:bg-blue-400 hover:text-cyan-50">View project</button>
    </div>
  `;

  // grab the button from within this card only
  const btn = child.querySelector(".view-btn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    showBigCard(project);
  });

  return child;
}
//show more on one project that is clicked
function showBigCard(project) {
  (async () => {
    // show loading spinner
    mainContent.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-white">
        <div class="flex flex-col items-center gap-4">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p class="text-gray-600 text-lg font-medium">Loading project...</p>
        </div>
      </div>
    `;

    try {
      const res = await fetch(`${url}/${project.id}`);
      const data = await res.json();

      const child = document.createElement("div");
      child.innerHTML = `
        <div class="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-500 to-white text-black relative">
          <button 
            class="absolute top-6 left-6 px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-800 transition"
            id="backToProjects"
          >
            Back
          </button>
          <img 
            src="${data.image}" 
            alt="${data.title}" 
            class="w-full max-w-3xl object-cover rounded-lg mb-6"
          />
          <h1 class="text-3xl font-bold text-gray-900 text-center">${data.title}</h1>
          <p class="text-gray-800 max-w-2xl mt-4">${data.description}</p>
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
    } catch (error) {
      console.error(error);
      mainContent.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-white text-red-600 text-xl font-semibold">
          ⚠️ Failed to load project. Please try again later.
        </div>
      `;
    }
  })();
}
//list all projects
function displayProjects() {
  staticContent.style.display = "none";

  mainContent.className = `
    min-h-screen 
    bg-gradient-to-b 
    from-gray-500 
    to-white
    p-6 
    space-y-6
  `;

  // Show loading screen
  mainContent.innerHTML = `
    <div id="loading" class="flex flex-col items-center justify-center py-20 text-gray-800">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <p class="text-lg font-medium">Loading projects...</p>
    </div>
  `;

  // Fetch and render projects
  (async () => {
    const res = await fetch(`${url}`);
    const allProjects = await res.json();

    // Clear loading screen
    mainContent.innerHTML = "";

    const controls = document.createElement("div");
    controls.className = "flex justify-between items-center gap-4 flex-wrap";

    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
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

    // Initial render
    renderCards(allProjects);

    // Search filtering
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase().trim();
      const filtered = allProjects.filter((project) =>
        project.title.toLowerCase().includes(term)
      );

      renderCards(filtered);
    });

    function renderCards(projects) {
      projectGrid.innerHTML = "";

      if (projects.length === 0) {
        projectGrid.innerHTML = `
          <p class="text-gray-700 text-center w-full col-span-full">No projects found matching your search.</p>
        `;
        return;
      }

      projects.forEach((project) => {
        const card = showsmallCard(project);
        projectGrid.append(card);
      });
    }
  })();
}

//show the profile when back button is clicked
function restoreProfileLayout() {
  mainContent.className = `transition-opacity duration-500 opacity-100`;
  mainContent.innerHTML = "";
  staticContent.style.display = "block";

  document
    .getElementById("projects")
    .addEventListener("click", displayProjects);
}
