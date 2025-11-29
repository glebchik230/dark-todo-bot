const { Telegraf } = require("telegraf");
const fs = require("fs");

// Вставь сюда токен от BotFather
const bot = new Telegraf("ТОКЕН_ОТ_BOTFATHER");

// Локальное хранение задач
const DB_FILE = "todos.json";

function loadTodos() {
  if (!fs.existsSync(DB_FILE)) return {};
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveTodos(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Стартовое сообщение
bot.start((ctx) => {
  ctx.reply("👋 Привет! Я тёмный минималистичный To-Do бот.\n\nКоманды:\n/add задача\n/list — список дел\n/clear — очистить список\n/webapp — открыть WebApp");
});

// Добавление задачи
bot.command("add", (ctx) => {
  const text = ctx.message.text.replace("/add", "").trim();
  if (!text) return ctx.reply("Добавьте текст задачи");

  const id = ctx.from.id;
  const todos = loadTodos();

  if (!todos[id]) todos[id] = [];

  todos[id].push({ text, done: false });
  saveTodos(todos);

  ctx.reply(`Задача добавлена: ${text}`);
});

// Список задач
bot.command("list", (ctx) => {
  const id = ctx.from.id;
  const todos = loadTodos();

  if (!todos[id] || todos[id].length === 0)
    return ctx.reply("Список пуст");

  let msg = "📝 Список дел:\n\n";
  todos[id].forEach((t, i) => {
    msg += `${i + 1}. ${t.text}\n`;
  });

  ctx.reply(msg);
});

// Очистка задач
bot.command("clear", (ctx) => {
  const id = ctx.from.id;
  const todos = loadTodos();
  todos[id] = [];
  saveTodos(todos);

  ctx.reply("Список очищен!");
});

// Открыть WebApp
bot.command("webapp", (ctx) => {
  ctx.replyWithWebApp("Открыть To-Do Мини", "https://ТВОЙ_АККАУНТ.github.io/dark-todo-bot/webapp/index.html");
});

// Запуск бота
bot.launch();
console.log("Бот запущен.");
