const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");
const folderBtns = document.querySelectorAll(".folder-btn");

let currentFolder = "general";
let notes = JSON.parse(localStorage.getItem("notes")) || {};

// --- Переключение папок с анимацией ---
folderBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    folderBtns.forEach(f => f.classList.remove("active"));
    btn.classList.add("active");

    // плавное скрытие старых заметок
    const oldNotes = document.querySelectorAll("#noteList li");
    oldNotes.forEach(li => li.style.opacity = 0);

    setTimeout(() => {
      currentFolder = btn.dataset.folder;
      renderNotes();
    }, 200); // небольшая задержка для эффекта
  });
});

// --- Добавление заметки ---
addNoteBtn.onclick = () => {
  const val = noteInput.value.trim();
  if (!val) return;

  if (!notes[currentFolder]) notes[currentFolder] = [];
  notes[currentFolder].push({ text: val, completed: false });

  noteInput.value = "";
  saveNotes();
};

// --- Рендер заметок с анимацией ---
function renderNotes() {
  noteList.innerHTML = "";
  if (!notes[currentFolder]) return;

  notes[currentFolder].forEach((note, idx) => {
    const li = document.createElement("li");
    li.textContent = note.text;
    if (note.completed) li.classList.add("completed");

    // кнопка выполнения
    const completeBtn = document.createElement("button");
    completeBtn.textContent = note.completed ? "↺" : "✔";
    completeBtn.onclick = () => {
      note.completed = !note.completed;
      saveNotes();
    };

    // кнопка удаления
    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.onclick = () => {
      notes[currentFolder].splice(idx,1);
      saveNotes();
    };

    li.appendChild(completeBtn);
    li.appendChild(delBtn);

    // добавляем задержку для плавного появления
    li.style.animationDelay = `${idx * 0.05}s`;
    noteList.appendChild(li);
  });
}

// --- Сохраняем локально ---
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

// --- Инициализация ---
renderNotes();
