const input = document.getElementById("taskInput");
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
  const val = input.value.trim();
  if (!val) return;
  tasks.push(val);
  input.value = "";
  saveTasks();
};

// Напоминания каждые 30 минут
setInterval(() => {
  if (tasks.length > 0) {
    alert("⏰ У тебя есть задачи в списке!");
  }
}, 1800000);

renderTasks();
