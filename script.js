// Вкладки
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tabContents.forEach(tc => tc.style.display = "none");
    document.getElementById(btn.dataset.tab).style.display = "block";
  });
});

// --- Задачи ---
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addBtn.onclick = () => {
  const val = taskInput.value.trim();
  if (!val) return;
  tasks.push(val);
  taskInput.value = "";
  saveTasks();
};

// --- Заметки ---
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  noteList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.onclick = () => {
      notes.splice(index, 1);
      saveNotes();
    };

    li.appendChild(delBtn);
    noteList.appendChild(li);
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

addNoteBtn.onclick = () => {
  const val = noteInput.value.trim();
  if (!val) return;
  notes.push(val);
  noteInput.value = "";
  saveNotes();
};

// --- Напоминания каждые 30 минут ---
setInterval(() => {
  if (tasks.length > 0) {
    alert("⏰ У тебя есть задачи в списке!");
  }
}, 1800000);

renderTasks();
renderNotes();
