let folders = JSON.parse(localStorage.getItem("folders")) || [];

const foldersContainer = document.getElementById("foldersContainer");
const addFolderBtn = document.getElementById("addFolderBtn");
const addTaskGlobal = document.getElementById("addTaskGlobal");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalInput = document.getElementById("modalInput");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");

let currentAction = null;
let selectedFolder = null;

/* RENDER */
function render() {
    foldersContainer.innerHTML = "";

    folders.forEach((folder, index) => {
        const completed = folder.tasks.filter(t => t.completed).length;

        const el = document.createElement("div");
        el.className = "folder";
        el.innerHTML = `
            <div class="folder-title">${folder.name}</div>
            <div class="folder-info">${folder.tasks.length} задач • ${completed} выполнено</div>
        `;

        el.onclick = () => openFolder(index);

        foldersContainer.appendChild(el);
    });

    localStorage.setItem("folders", JSON.stringify(folders));
}

/* FOLDER OPEN */
function openFolder(index) {
    const folder = folders[index];
    let output = "";

    folder.tasks.forEach((task, tIndex) => {
        output += `
            <div class="folder" style="margin-bottom:10px;" onclick="toggleTask(${index}, ${tIndex})">
                <div class="folder-title" style="${task.completed ? 'text-decoration: line-through; opacity:0.6;' : ''}">
                    ${task.name}
                </div>
            </div>
        `;
    });

    foldersContainer.innerHTML = `
        <button class="icon-btn" onclick="render()">←</button>
        <h2 style="margin: 15px 0;">${folder.name}</h2>
        ${output}
        <button class="main-action" onclick="addTask(${index})">+ Новая задача</button>
    `;
}

/* ADD FOLDER */
addFolderBtn.onclick = () => {
    currentAction = "folder";
    modalTitle.textContent = "Новая папка";
    modalInput.value = "";
    modal.classList.remove("hidden");
};

/* ADD TASK (global button chooses folder automatically later) */
addTaskGlobal.onclick = () => {
    if (folders.length === 0) {
        alert("Сначала создайте хотя бы одну папку");
        return;
    }
    alert("Откройте папку и нажмите «+ Новая задача»");
};

/* ADD TASK inside folder */
function addTask(folderIndex) {
    currentAction = "task";
    selectedFolder = folderIndex;
    modalTitle.textContent = "Новая задача";
    modalInput.value = "";
    modal.classList.remove("hidden");
}

/* SAVE NEW ITEM */
saveBtn.onclick = () => {
    const value = modalInput.value.trim();
    if (!value) return;

    if (currentAction === "folder") {
        folders.push({ name: value, tasks: [] });
    } else if (currentAction === "task") {
        folders[selectedFolder].tasks.push({ name: value, completed: false });
    }

    modal.classList.add("hidden");
    render();
};

/* CLOSE MODAL */
closeBtn.onclick = () => modal.classList.add("hidden");

/* TOGGLE TASK COMPLETE */
function toggleTask(fIndex, tIndex) {
    const task = folders[fIndex].tasks[tIndex];
    task.completed = !task.completed;
    render();
}

render();
