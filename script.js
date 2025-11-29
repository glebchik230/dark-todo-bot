// Вставь сюда токен своего бота
const TELEGRAM_BOT_TOKEN = "8546788734:AAGyK7m1RqmU6wASq6fp4hLH34gNJsA14rQ";

// --- Сохраняем chat_id локально ---
let TELEGRAM_CHAT_ID = localStorage.getItem("chat_id") || "";

// --- Если chat_id ещё нет, запрашиваем ---
if (!TELEGRAM_CHAT_ID) {
  TELEGRAM_CHAT_ID = prompt("Введите ваш chat_id из Telegram (через /setid у бота)");
  if (TELEGRAM_CHAT_ID) {
    localStorage.setItem("chat_id", TELEGRAM_CHAT_ID);
  }
}

// --- Функция отправки сообщений ---
function sendToTelegram(message) {
  if (!TELEGRAM_CHAT_ID) return;
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    })
  }).catch(err => console.error(err));
}

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

    const sendBtn = document.createElement("button");
    sendBtn.textContent = "Отправить боту";
    sendBtn.onclick = () => sendToTelegram("Задача: " + task);

    li.appendChild(delBtn);
    li.appendChild(sendBtn);
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
  sendToTelegram("Новая задача: " + val); // отправка сразу при добавлении
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

    const sendBtn = document.createElement("button");
    sendBtn.textContent = "Отправить боту";
    sendBtn.onclick = () => sendToTelegram("Заметка: " + note);

    li.appendChild(delBtn);
    li.appendChild(sendBtn);
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
  sendToTelegram("Новая заметка: " + val); // отправка сразу при добавлении
};

// --- Вкладки ---
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

renderTasks();
renderNotes();
