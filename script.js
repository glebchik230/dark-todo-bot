let folders = JSON.parse(localStorage.getItem("folders")) || {};
let currentFolder = null;

// Сохраняем в LS
function save() {
    localStorage.setItem("folders", JSON.stringify(folders));
}

// Показываем папки
function renderFolders() {
    const container = document.getElementById("folders");
    container.innerHTML = "";

    Object.keys(folders).forEach(folderName => {
        const div = document.createElement("div");
        div.className = "folder";
        div.innerHTML = `
            <span class="folder-name">${folderName}</span>
            <button onclick="openFolder('${folderName}')">Открыть</button>
        `;
        container.appendChild(div);
    });
}

renderFolders();

// Создать папку
function createFolder() {
    const name = document.getElementById("newFolderName").value.trim();
    if (!name) return;

    folders[name] = [];
    save();
    renderFolders();

    document.getElementById("newFolderName").value = "";
}

// Открыть папку
function openFolder(name) {
    currentFolder = name;

    document.getElementById("folderTitle").innerText = name;
    document.getElementById("tasksSection").classList.remove("hidden");
    document.getElementById("folders").classList.add("hidden");

    renderTasks();
}

// Закрыть папку
function closeFolder() {
    currentFolder = null;

    document.getElementById("tasksSection").classList.add("hidden");
    document.getElementById("folders").classList.remove("hidden");
}

// Создать задачу
function createTask() {
    const name = document.getElementById("newTaskName").value.trim();
    if (!name || !currentFolder) return;

    folders[currentFolder].push({
        text: name,
        done: false
    });

    save();
    renderTasks();

    document.getElementById("newTaskName").value = "";
}

// Рендер задач
function renderTasks() {
    const container = document.getElementById("tasks");
    container.innerHTML = "";

    folders[currentFolder].forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task" + (task.done ? " completed" : "");

        div.innerHTML = `
            <span>${task.text}</span>
            <input type="checkbox" class="checkbox" ${task.done ? "checked" : ""}
                onclick="toggleTask(${index})">
        `;

        container.appendChild(div);
    });
}

// Переключить задачу
function toggleTask(index) {
    folders[currentFolder][index].done = !folders[currentFolder][index].done;
    save();
    renderTasks();
}
