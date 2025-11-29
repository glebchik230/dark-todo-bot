let folders = JSON.parse(localStorage.getItem('folders')) || [];
const foldersContainer = document.getElementById('foldersContainer');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalInput = document.getElementById('modalInput');
const saveBtn = document.getElementById('saveBtn');
const closeBtn = document.getElementById('closeBtn');
let currentAction = null;
let currentFolderIndex = null;

function render() {
    foldersContainer.innerHTML = '';
    folders.forEach((folder, fIndex) => {
        const folderEl = document.createElement('div');
        folderEl.className = 'folder';
        folderEl.innerHTML = `
            <h3>${folder.name} <button onclick="addTask(${fIndex})">+ Задача</button></h3>
            <div class="tasks">
                ${folder.tasks.map((task, tIndex) => `
                    <div class="task ${task.completed ? 'completed' : ''}">
                        <span onclick="toggleTask(${fIndex}, ${tIndex})">${task.name}</span>
                        <button onclick="deleteTask(${fIndex}, ${tIndex})">🗑</button>
                    </div>
                `).join('')}
            </div>
        `;
        foldersContainer.appendChild(folderEl);
    });
}

function addFolder() {
    currentAction = 'folder';
    modalTitle.textContent = 'Новая папка';
    modalInput.value = '';
    modal.classList.remove('hidden');
}

function addTask(folderIndex) {
    currentAction = 'task';
    currentFolderIndex = folderIndex;
    modalTitle.textContent = 'Новая задача';
    modalInput.value = '';
    modal.classList.remove('hidden');
}

function save() {
    const value = modalInput.value.trim();
    if (!value) return;
    if (currentAction === 'folder') {
        folders.push({ name: value, tasks: [] });
    } else if (currentAction === 'task') {
        folders[currentFolderIndex].tasks.push({ name: value, completed: false });
    }
    localStorage.setItem('folders', JSON.stringify(folders));
    modal.classList.add('hidden');
    render();
}

function closeModal() {
    modal.classList.add('hidden');
}

function toggleTask(fIndex, tIndex) {
    folders[fIndex].tasks[tIndex].completed = !folders[fIndex].tasks[tIndex].completed;
    localStorage.setItem('folders', JSON.stringify(folders));
    render();
}

function deleteTask(fIndex, tIndex) {
    folders[fIndex].tasks.splice(tIndex,1);
    localStorage.setItem('folders', JSON.stringify(folders));
    render();
}

document.getElementById('addFolderBtn').addEventListener('click', addFolder);
saveBtn.addEventListener('click', save);
closeBtn.addEventListener('click', closeModal);

render();
